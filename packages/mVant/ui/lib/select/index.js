"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const index = require("./src/index.vue.js");
const withInstall = require("../utils/common/with-install.js");
const vant = require("vant");
const EvSelect = withInstall.withInstall({
  ...index.default,
  __dependencies__: [vant.Popup, vant.Picker]
});
exports.EvSelect = EvSelect;
exports.default = EvSelect;
