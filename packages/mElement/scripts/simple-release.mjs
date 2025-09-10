#!/usr/bin/env node

/**
 * 简化版发布脚本
 * 不使用 TypeScript 语法，纯 JavaScript
 */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import enquirer from 'enquirer';
import chalk from 'chalk';
import { execSync } from 'child_process';

// 获取 __dirname (ESM 环境中需要这样处理)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 版本增量类型
const versionIncrements = ['patch', 'minor', 'major'];

// 执行命令函数
function run(command, options = {}) {
  console.log(chalk.blue(`执行命令: ${command}`));
  return execSync(command, { stdio: 'inherit', ...options });
}

// 步骤提示
function step(msg) {
  console.log(chalk.cyan(`\n${msg}`));
}

// 主函数
async function main() {
  try {
    // 读取 package.json
    const pkgPath = path.resolve(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const currentVersion = pkg.version;

    console.log(`当前版本: ${currentVersion}`);

    // 选择版本类型
    const semver = (await import('semver')).default;
    const { prompt } = enquirer;

    // 生成版本选项
    const versionChoices = {};
    versionIncrements.forEach((type, index) => {
      const version = semver.inc(currentVersion, type);
      versionChoices[type] = version;
      console.log(`${index + 1}. ${type} (${version})`);
    });

    const { releaseInput } = await prompt({
      type: 'input',
      name: 'releaseInput',
      message: '请输入选项序号 (1:patch, 2:minor, 3:major):'
    });

    const index = parseInt(releaseInput) - 1;
    if (isNaN(index) || index < 0 || index >= versionIncrements.length) {
      throw new Error(`无效的选项: ${releaseInput}`);
    }

    const selectedType = versionIncrements[index];
    const targetVersion = versionChoices[selectedType];

    console.log(chalk.green(`已选择: ${selectedType} (${targetVersion})`));

    // 确认版本
    const { confirm } = await prompt({
      type: 'confirm',
      name: 'confirm',
      message: `确认发布版本 ${targetVersion}?`
    });

    if (!confirm) {
      console.log(chalk.yellow('已取消发布'));
      return;
    }

    // 构建项目（不更新版本号）
    step('构建项目...');
    run('pnpm build');

    // 确定发布目录
    let publishDir;
    const uiDir = path.resolve(__dirname, '../ui');
    const distDir = path.resolve(__dirname, '../dist');

    if (fs.existsSync(uiDir)) {
      publishDir = uiDir;
      console.log(chalk.green('找到 ui 目录，将从此处发布'));
    } else if (fs.existsSync(distDir)) {
      publishDir = distDir;
      console.log(chalk.green('找到 dist 目录，将从此处发布'));
    } else {
      console.log(chalk.yellow('未找到 ui 或 dist 目录，将从当前目录发布'));
      publishDir = path.resolve(__dirname, '..');
    }

    // 确认发布
    console.log(`将发布 ${pkg.name}@${targetVersion}`);
    console.log(`发布目录: ${publishDir}`);

    const { confirmPublish } = await prompt({
      type: 'confirm',
      name: 'confirmPublish',
      message: `准备发布到 NPM，确认?`
    });

    if (!confirmPublish) {
      console.log(chalk.yellow('已取消发布'));
      return;
    }

    // 开始发布流程
    try {
      // 1. 先更新版本号
      step('更新版本号...');
      // 主包版本更新
      pkg.version = targetVersion;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

      // 检查 ui 目录的 package.json
      const uiPkgPath = path.resolve(__dirname, '../ui/package.json');
      if (fs.existsSync(uiPkgPath)) {
        const uiPkg = JSON.parse(fs.readFileSync(uiPkgPath, 'utf-8'));
        uiPkg.version = targetVersion;
        fs.writeFileSync(uiPkgPath, JSON.stringify(uiPkg, null, 2) + '\n');
        console.log(
          chalk.green(`已更新 ui/package.json 版本为 ${targetVersion}`)
        );
      }

      // 2. 生成 changelog
      step('生成变更日志...');
      const uiDir = path.resolve(__dirname, '../ui');
      const changelogPath = path.resolve(uiDir, 'CHANGELOG.md');

      // 确保 ui 目录存在
      if (fs.existsSync(uiDir)) {
        const changelogExists = fs.existsSync(changelogPath);

        const date = new Date().toISOString().split('T')[0];
        const changelog = `${changelogExists ? '\n' : ''}## v${targetVersion} (${date})\n\n* 发布版本 ${targetVersion}\n`;

        fs.appendFileSync(changelogPath, changelog);
        console.log(chalk.green('已生成变更日志到 ui/CHANGELOG.md'));
      } else {
        console.log(chalk.yellow('UI 目录不存在，跳过变更日志生成...'));
      }

      // 3. 发布到 NPM
      step('发布到 NPM...');
      // 保存当前目录
      const currentDir = process.cwd();
      // 切换到发布目录
      process.chdir(publishDir);

      run('npm publish --access public');
      console.log(chalk.green(`成功发布 ${pkg.name}@${targetVersion} 到 NPM!`));

      // 切换回原目录
      process.chdir(currentDir);

      // 4. 提交 Git 更改
      step('提交更改到 Git...');
      run('git add -A');
      run(`git commit -m "chore: release v${targetVersion}"`);

      // 5. 创建 Git 标签和推送
      step('创建 Git 标签并推送...');
      run(`git tag v${targetVersion}`);
      run(`git push origin v${targetVersion}`);
      run('git push');

      console.log(chalk.green(`\n发布 v${targetVersion} 完成!`));
    } catch (error) {
      console.error(chalk.red(`\n发布失败: ${error.message}`));

      // 发布失败，恢复版本号
      step('发布失败，恢复版本号...');
      // 恢复主包版本
      pkg.version = currentVersion;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

      // 恢复 ui 包版本（如果存在）
      const uiPkgPath = path.resolve(__dirname, '../ui/package.json');
      if (fs.existsSync(uiPkgPath)) {
        const uiPkg = JSON.parse(fs.readFileSync(uiPkgPath, 'utf-8'));
        uiPkg.version = currentVersion;
        fs.writeFileSync(uiPkgPath, JSON.stringify(uiPkg, null, 2) + '\n');
      }

      console.log(chalk.yellow(`已恢复版本号为 ${currentVersion}`));
      throw error;
    }
  } catch (error) {
    console.error(chalk.red(`\n发布过程中出错: ${error.message}`));
    process.exit(1);
  }
}

main();
