"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const withInstall = require("../utils/common/with-install.js");
const vant = require("vant");
const index = require("./src/index.vue.js");
const EvInput = withInstall.withInstall({
  ...index.default,
  __dependencies__: [vant.Field]
});
exports.EvInput = EvInput;
exports.default = EvInput;
