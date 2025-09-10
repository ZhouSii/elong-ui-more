"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const _hoisted_1 = { class: "m-title" };
const __default__ = vue.defineComponent({
  name: "EvTitle"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: {
    label: {
      type: String,
      default: ""
    },
    isTips: {
      type: Boolean,
      default: false
    },
    tipsColor: {
      type: String,
      default: "#00942a"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass([__props.isTips ? "m-title-label" : ""]),
          style: vue.normalizeStyle("--tc:" + __props.tipsColor)
        }, [
          vue.createTextVNode(vue.toDisplayString(__props.label) + " ", 1),
          vue.renderSlot(_ctx.$slots, "label", {}, void 0, true)
        ], 6),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
exports.default = _sfc_main;
