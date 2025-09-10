import DefaultTheme from "vitepress/theme";
// import elongUI from "elong-vue3-ui";
import ElongUI from "elong-vue3-ui";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(ElongUI);
  },
};
