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

// 用于外部注入样式导入函数的接口
type StyleImporter = (componentName: string) => Promise<any> | void;
const styleImporters: StyleImporter[] = [];

// 注册样式导入函数
export function registerStyleImporter(importer: StyleImporter) {
  styleImporters.push(importer);
}

// 记录已处理的组件，避免重复处理
const processedComponents = new Set<string>();

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

    console.log('🚀 ~ withInstall ~ __dependencies__:', __dependencies__);
    if (__dependencies__) {
      __dependencies__.forEach((item) => {
        const componentName = item.name as string;
        app.component(componentName, item);

        // 如果有注册的样式导入函数，尝试导入样式
        if (
          componentName &&
          !processedComponents.has(componentName) &&
          styleImporters.length > 0
        ) {
          processedComponents.add(componentName);

          // 尝试所有注册的样式导入函数
          styleImporters.forEach((importer) => {
            try {
              const result = importer(componentName);
              if (result instanceof Promise) {
                result.catch((err) => {
                  console.debug(
                    `Style import attempt for ${componentName} failed:`,
                    err
                  );
                });
              }
            } catch (err) {
              console.debug(`Style importer error for ${componentName}:`, err);
            }
          });
        }
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
