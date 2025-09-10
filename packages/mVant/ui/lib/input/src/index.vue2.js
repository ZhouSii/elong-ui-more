"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const __default__ = vue.defineComponent({
  name: "EvInput"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const slots = vue.useSlots();
    const model = vue.computed({
      get: () => props.modelValue,
      set: (val) => {
        emit("update:modelValue", val);
      }
    });
    return (_ctx, _cache) => {
      const _component_van_field = vue.resolveComponent("van-field");
      return vue.openBlock(), vue.createBlock(_component_van_field, vue.mergeProps(_ctx.$attrs, {
        modelValue: vue.unref(model),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
        placeholder: __props.placeholder
      }), vue.createSlots({ _: 2 }, [
        vue.renderList(vue.unref(slots), (value, name) => {
          return {
            name,
            fn: vue.withCtx((scopedData) => [
              vue.renderSlot(_ctx.$slots, name, vue.normalizeProps(vue.guardReactiveProps(scopedData || {})), void 0, true)
            ])
          };
        })
      ]), 1040, ["modelValue", "placeholder"]);
    };
  }
});
exports.default = _sfc_main;
