"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const format = require("../format.js");
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
        app.component(format.camelize(`-${item.name}`), item);
      });
    }
  };
  return options;
}
exports.withInstall = withInstall;
