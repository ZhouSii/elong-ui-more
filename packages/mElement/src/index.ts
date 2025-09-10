import * as components from './components';
export * from './components';
// 导出常量
export * from './constants';
// 导出方法
export * from './utils';

import { App } from 'vue';
// 导入 UnoCSS 样式
import 'uno.css';
// 导入 Element Plus 样式
import './styles/element-plus';

export default {
  install: (app: App) => {
    console.log('mVant install:melement 需要注入的插件', components);
    for (const c in components) {
      app.use(components[c]);
    }
  }
};
