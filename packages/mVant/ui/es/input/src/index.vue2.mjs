import { defineComponent, useSlots, computed, resolveComponent, openBlock, createBlock, mergeProps, unref, isRef, createSlots, renderList, withCtx, renderSlot, normalizeProps, guardReactiveProps } from "vue";
const __default__ = defineComponent({
  name: "EvInput"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const slots = useSlots();
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit("update:modelValue", val);
      }
    });
    return (_ctx, _cache) => {
      const _component_van_field = resolveComponent("van-field");
      return openBlock(), createBlock(_component_van_field, mergeProps(_ctx.$attrs, {
        modelValue: unref(model),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
        placeholder: __props.placeholder
      }), createSlots({ _: 2 }, [
        renderList(unref(slots), (value, name) => {
          return {
            name,
            fn: withCtx((scopedData) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(scopedData || {})), void 0, true)
            ])
          };
        })
      ]), 1040, ["modelValue", "placeholder"]);
    };
  }
});
export {
  _sfc_main as default
};
