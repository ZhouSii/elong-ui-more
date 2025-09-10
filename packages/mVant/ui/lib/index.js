"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const components = require("./components.js");
const index$1 = require("./input/index.js");
const index$2 = require("./select/index.js");
const index$3 = require("./title/index.js");
const index = {
  install: (app) => {
    console.log("mVant install", components);
    for (const c in components) {
      app.use(components[c]);
    }
  }
};
exports.EvInput = index$1.EvInput;
exports.EvSelect = index$2.EvSelect;
exports.EvTitle = index$3.EvTitle;
exports.default = index;
