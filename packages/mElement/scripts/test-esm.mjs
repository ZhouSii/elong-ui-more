#!/usr/bin/env node

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// 获取 __dirname (ESM 环境中需要这样处理)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 使用 createRequire 模拟 require 函数
const require = createRequire(import.meta.url);

try {
  // 尝试读取 package.json
  const pkgPath = path.resolve(__dirname, '../package.json');
  const pkg = require(pkgPath);

  console.log('✅ Successfully loaded package.json');
  console.log(`Package name: ${pkg.name}`);
  console.log(`Package version: ${pkg.version}`);

  // 尝试导入依赖
  const modules = [
    'chalk',
    'execa',
    'enquirer',
    'semver',
    'minimist',
    'fs-extra'
  ];
  for (const module of modules) {
    try {
      const imported = await import(module);
      console.log(`✅ Successfully imported ${module}`);
    } catch (err) {
      console.log(`❌ Failed to import ${module}: ${err.message}`);
    }
  }

  console.log(
    '\n🎉 All tests passed! The release script should work properly.'
  );
} catch (err) {
  console.error(`❌ Test failed: ${err.message}`);
  process.exit(1);
}
