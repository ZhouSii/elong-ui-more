import { defineComponent, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, createTextVNode, toDisplayString, renderSlot } from "vue";
const _hoisted_1 = { class: "m-title" };
const __default__ = defineComponent({
  name: "EvTitle"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("span", {
          class: normalizeClass([__props.isTips ? "m-title-label" : ""]),
          style: normalizeStyle("--tc:" + __props.tipsColor)
        }, [
          createTextVNode(toDisplayString(__props.label) + " ", 1),
          renderSlot(_ctx.$slots, "label", {}, void 0, true)
        ], 6),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
