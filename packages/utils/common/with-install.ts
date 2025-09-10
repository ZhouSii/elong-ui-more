import { camelize } from '@elong-ui/vant/src/utils/format';
import type { App, Component } from 'vue';

// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: unknown[]): {
    $props: {
      onClick?: (...args: unknown[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
  __dependencies__: Component[];
} & EventShim;

export function withInstall<T extends Component>(options: any) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name, __dependencies__ } = options;
    if (name) {
      app.component(name, options);
    }

    if (__dependencies__) {
      __dependencies__.map((item) => {
        app.component(item.name as string, item);
      });
    }
  };

  return options as WithInstall<T>;
}

// export function withInstall<T extends Component>(options: WithInstall<T>) {
//   options.install = (app: App) => {
//     const { name, __dependencies__ } = options;
//     console.log('🚀 ~ file: with-install.ts:20 ~ options:', options);
//     if (name) {
//       app.component(name, options);
//       // app.component(camelize(`-${name}`), options);
//     }

//     if (__dependencies__) {
//       __dependencies__.map((item) => app.component(item.name as string, item));
//     }
//   };

//   return options;
// }
