// .vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme';
// 1. 引入你需要的组件
import vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

import elongVant from '@elong-ui/vant';

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(vant);

    app.use(elongVant);
  }
};
