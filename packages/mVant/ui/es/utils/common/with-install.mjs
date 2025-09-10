import { camelize } from "../format.mjs";
function withInstall(options) {
  options.install = (app) => {
    const { name, __dependencies__ } = options;
    console.log("🚀 ~ file: with-install.ts:20 ~ options:", options);
    if (name) {
      app.component(name, options);
    }
    if (__dependencies__) {
      __dependencies__.map((item) => {
        app.component(item.name, item);
        app.component(camelize(`-${item.name}`), item);
      });
    }
  };
  return options;
}
export {
  withInstall
};
