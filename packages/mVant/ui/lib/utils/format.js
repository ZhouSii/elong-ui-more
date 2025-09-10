"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const camelizeRE = /-(\w)/g;
const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
exports.camelize = camelize;
