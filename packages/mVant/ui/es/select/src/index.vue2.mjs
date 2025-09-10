import { defineComponent, useSlots, toRefs, ref, computed, resolveComponent, openBlock, createElementBlock, createVNode, unref, isRef, withCtx, createElementVNode, toDisplayString, createCommentVNode, renderSlot, pushScopeId, popScopeId } from "vue";
import { EvInput } from "../../input/index.mjs";
import { defaultProps } from "../../utils/defaultProps.mjs";
import { stringToArray, selectDictLabels } from "../../utils/core.mjs";
const _withScopeId = (n) => (pushScopeId("data-v-782a5514"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", { class: "vanCheck" }, null, -1));
const _hoisted_2 = {
  key: 0,
  class: "van-picker__toolbar"
};
const _hoisted_3 = { class: "van-picker__title van-ellipsis" };
const _hoisted_4 = { style: { "flex": "1", "overflow": "auto" } };
const __default__ = defineComponent({
  name: "EvSelect"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    ...defaultProps,
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  emits: ["update:modelValue", "onChange"],
  setup(__props, { emit }) {
    const props = __props;
    const slotSearch = !!useSlots().search;
    const { columns, disabled } = toRefs(props);
    const showPicker = ref(false);
    const slotSelected = ref("");
    const cacheSelected = ref(null);
    const selected = computed({
      get: () => {
        cacheSelected.value = props.modelValue ? props.modelValue + "" : null;
        slotSelected.value = props.modelValue ? props.modelValue + "" : "";
        return stringToArray(props.modelValue + "");
      },
      set: (val) => {
        slotSelected.value = val[0];
      }
    });
    const selectedLabel = computed(() => {
      return selectDictLabels(columns == null ? void 0 : columns.value, selected.value);
    });
    const onClickShow = () => {
      if (!disabled.value) {
        showPicker.value = true;
      }
    };
    const onConfirmSlot = () => {
      if (cacheSelected.value !== slotSelected.value) {
        cacheSelected.value = slotSelected.value;
        emit("onChange", cacheSelected.value);
      }
      showPicker.value = false;
    };
    const onConfirm = ({ selectedOptions }) => {
      const selected2 = selectedOptions[0].value || "";
      if (cacheSelected.value !== selected2) {
        cacheSelected.value = selected2;
        emit("update:modelValue", selected2);
        emit("onChange", selected2);
      }
      showPicker.value = false;
    };
    return (_ctx, _cache) => {
      const _component_van_picker = resolveComponent("van-picker");
      const _component_van_popup = resolveComponent("van-popup");
      return openBlock(), createElementBlock("div", null, [
        createVNode(unref(EvInput), {
          modelValue: unref(selectedLabel),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedLabel) ? selectedLabel.value = $event : null),
          name: "select",
          readonly: "",
          label: _ctx.label,
          placeholder: __props.placeholder,
          required: _ctx.required,
          rules: _ctx.rules,
          type: "textarea",
          rows: 1,
          autosize: true,
          onClick: onClickShow
        }, {
          button: withCtx(() => [
            _hoisted_1
          ]),
          _: 1
        }, 8, ["modelValue", "label", "placeholder", "required", "rules"]),
        createVNode(_component_van_popup, {
          show: showPicker.value,
          "onUpdate:show": _cache[4] || (_cache[4] = ($event) => showPicker.value = $event),
          round: "",
          position: "bottom",
          teleport: _ctx.attrs.teleport,
          style: { height: "60%", display: "flex", "flex-direction": "column" }
        }, {
          default: withCtx(() => [
            slotSearch ? (openBlock(), createElementBlock("div", _hoisted_2, [
              createElementVNode("button", {
                class: "van-picker__cancel van-haptics-feedback",
                onClick: _cache[1] || (_cache[1] = ($event) => showPicker.value = false)
              }, " 取消 "),
              createElementVNode("div", _hoisted_3, toDisplayString(_ctx.label), 1),
              createElementVNode("button", {
                class: "van-picker__confirm van-haptics-feedback",
                onClick: onConfirmSlot
              }, " 确认 ")
            ])) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "search", {}, void 0, true),
            createElementVNode("div", _hoisted_4, [
              createVNode(_component_van_picker, {
                ref: "picker",
                modelValue: unref(selected),
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(selected) ? selected.value = $event : null),
                title: _ctx.label,
                columns: unref(columns),
                "show-toolbar": !slotSearch,
                onConfirm,
                onCancel: _cache[3] || (_cache[3] = ($event) => showPicker.value = false)
              }, null, 8, ["modelValue", "title", "columns", "show-toolbar"])
            ])
          ]),
          _: 3
        }, 8, ["show", "teleport"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
