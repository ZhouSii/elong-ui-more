import * as components from './components';
export * from './components';
import { App } from 'vue';

export default {
  install: (app: App) => {
    console.log('mVant install', components);
    for (const c in components) {
      app.use(components[c]);
      // console.log('components[c]', components[c]);
      // components[c].map((item) => app.use(item));
    }
  }
};
