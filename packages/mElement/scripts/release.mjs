import chalk from 'chalk';
import execa from 'execa';
import enquirer from 'enquirer';
import semver from 'semver';
import minimist from 'minimist';
import { createRequire } from 'module';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const { prompt } = enquirer;

// 获取 __dirname (ESM 环境中需要这样处理)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 因为 package.json 声明了 `type: "module"`, 而 esm 环境下没有 require 方法，所以我们使用 createRequire 来声明 require
const require = createRequire(import.meta.url);
// 解析命令行参数
const args = minimist(process.argv.slice(2));
// 是否是 dry 模式。dry 模式下只会展示命令，不会真正执行命令，用来测试。
const isDry = args.dry;

const versionIncrements = ['patch', 'minor', 'major'];

const pkg = require('../package.json');
const currentVersion = pkg.version;

const directRun = (bin, args) => {
  return execa(bin, args, { stdio: 'inherit' });
};

const dryRun = (bin, args) => {
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`));
  return;
};

const run = isDry ? dryRun : directRun;

const step = (msg) => console.log(chalk.cyan(msg));

// 更新 package.json 中的 version 字段
function updateVersion(version) {
  // 更新主 package.json
  pkg.version = version;
  fs.writeFileSync(
    path.resolve(__dirname, '../package.json'),
    JSON.stringify(pkg, null, 2)
  );

  // 检查并更新 ui 目录下的 package.json
  const uiPkgPath = path.resolve(__dirname, '../ui/package.json');
  if (fs.existsSync(uiPkgPath)) {
    try {
      const uiPkg = require(uiPkgPath);
      uiPkg.version = version;
      fs.writeFileSync(uiPkgPath, JSON.stringify(uiPkg, null, 2) + '\n');
      console.log(
        chalk.green(`Updated version in ui/package.json to ${version}`)
      );
    } catch (error) {
      console.log(
        chalk.yellow(`Failed to update ui/package.json: ${error.message}`)
      );
    }
  } else {
    console.log(
      chalk.yellow('ui/package.json not found, skipping version update')
    );
  }
}

async function main() {
  // 1. 确定变动版本级别 `patch | minor | major`，遵循 semver 规范。
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(
      (i) => `${i} (${semver.inc(currentVersion, i)})`
    )
  });
  const targetVersion = release.match(/\((.*)\)/)[1];

  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing ${targetVersion}. Confirm?`
  });

  if (!confirm) {
    return;
  }
  // 2. 执行测试（如果没有测试，就跳过）
  try {
    step('\nRunning tests...');
    // 检查是否有测试脚本
    if (pkg.scripts && pkg.scripts['test:unit']) {
      await run('pnpm', ['test:unit']);
    } else {
      console.log(chalk.yellow('No unit tests found, skipping...'));
    }

    if (pkg.scripts && pkg.scripts['test:e2e']) {
      await run('pnpm', ['test:e2e']);
    } else {
      console.log(chalk.yellow('No e2e tests found, skipping...'));
    }
  } catch (error) {
    console.log(chalk.yellow('Tests failed, but continuing with release...'));
  }

  // 3. 自动修改包版本
  if (!isDry) {
    step('\nUpdate version...');
    updateVersion(targetVersion);
  }

  // 4. 执行 pnpm build
  step('\nBuilding package...');
  await run('pnpm', ['build']);

  // 5. 生成 CHANGELOG.md（如果没有 changelog 命令就跳过）
  step('\nGenerating changelog...');
  try {
    if (pkg.scripts && pkg.scripts.changelog) {
      await run('pnpm', ['changelog']);
    } else {
      console.log(
        chalk.yellow('No changelog script found, creating simple changelog...')
      );
      // 创建简单的 changelog 记录
      const uiDir = path.resolve(__dirname, '../ui');
      const changelogPath = path.resolve(uiDir, 'CHANGELOG.md');

      // 确保 ui 目录存在
      if (fs.existsSync(uiDir)) {
        const changelogExists = fs.existsSync(changelogPath);

        const date = new Date().toISOString().split('T')[0];
        const changelog = `${changelogExists ? '\n' : ''}## v${targetVersion} (${date})\n\n* Release version ${targetVersion}\n`;

        fs.appendFileSync(changelogPath, changelog);
        console.log(chalk.green(`Generated changelog in ui/CHANGELOG.md`));
      } else {
        console.log(
          chalk.yellow(
            'UI directory not found, skipping changelog generation...'
          )
        );
      }
    }
  } catch (error) {
    console.log(
      chalk.yellow(
        'Failed to generate changelog, but continuing with release...'
      )
    );
  }

  // 6. 生成 release commit
  step('\nCommitting changes...');
  // 只添加需要的文件，避免添加被 .gitignore 忽略的构建产物
  await run('git', ['add', 'package.json']);
  if (fs.existsSync(path.resolve(__dirname, '../ui/package.json'))) {
    await run('git', ['add', 'ui/package.json']);
  }
  if (fs.existsSync(path.resolve(__dirname, '../ui/CHANGELOG.md'))) {
    await run('git', ['add', 'ui/CHANGELOG.md']);
  }
  await run('git', ['commit', '-m', `chore: release v${targetVersion}`]);

  // 7. 执行 npm publish
  step('\nPublishing packages...');

  // 检查是否有 ui 目录（一般构建产物会放在这里）
  const uiDir = path.resolve(__dirname, '../ui');
  const distDir = path.resolve(__dirname, '../dist');

  // 检查要发布的目录
  let publishDir;
  if (fs.existsSync(uiDir)) {
    publishDir = uiDir;
    console.log(chalk.green('Found ui directory, will publish from there.'));
  } else if (fs.existsSync(distDir)) {
    publishDir = distDir;
    console.log(chalk.green('Found dist directory, will publish from there.'));
  } else {
    console.log(
      chalk.yellow(
        'No ui or dist directory found, publishing from current directory.'
      )
    );
    publishDir = path.resolve(__dirname, '..');
  }

  // 确认发布信息
  console.log(chalk.yellow('Publishing directory:'), publishDir);
  console.log(chalk.yellow('Package name:'), pkg.name);
  console.log(chalk.yellow('Package version:'), targetVersion);

  const { confirmPublish } = await prompt({
    type: 'confirm',
    name: 'confirmPublish',
    message: `Ready to publish ${pkg.name}@${targetVersion} to npm?`
  });

  if (!confirmPublish) {
    console.log(chalk.yellow('NPM publish canceled.'));
  } else {
    // 执行发布
    try {
      // 切换到发布目录
      process.chdir(publishDir);

      console.log(chalk.green(`Publishing from ${publishDir}...`));
      await run('npm', ['publish', '--access', 'public']);
      console.log(
        chalk.green(`Successfully published ${pkg.name}@${targetVersion}`)
      );
    } catch (error) {
      console.error(chalk.red(`Failed to publish: ${error.message}`));

      // 检查是否已登录 npm
      try {
        const whoami = await execa('npm', ['whoami']);
        console.log(chalk.green(`Logged in as: ${whoami.stdout}`));
      } catch (e) {
        console.error(
          chalk.red(
            'You are not logged in to npm. Please run `npm login` first.'
          )
        );
      }

      // 提示继续
      const { continueAfterPublishError } = await prompt({
        type: 'confirm',
        name: 'continueAfterPublishError',
        message: 'Continue with git operations despite npm publish failure?'
      });

      if (!continueAfterPublishError) {
        throw error;
      }
    }
  }

  // 8. git push 并打 tag
  step('\nPushing to GitHub...');
  await run('git', ['tag', `v${targetVersion}`]);
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
  await run('git', ['push']);
}

main().catch((err) => {
  // 错误兜底处理，回退版本
  console.log(err);
  updateVersion(currentVersion);
});
