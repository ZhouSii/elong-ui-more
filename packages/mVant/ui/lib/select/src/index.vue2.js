"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const index = require("../../input/index.js");
const defaultProps = require("../../utils/defaultProps.js");
const core = require("../../utils/core.js");
const _withScopeId = (n) => (vue.pushScopeId("data-v-782a5514"), n = n(), vue.popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "vanCheck" }, null, -1));
const _hoisted_2 = {
  key: 0,
  class: "van-picker__toolbar"
};
const _hoisted_3 = { class: "van-picker__title van-ellipsis" };
const _hoisted_4 = { style: { "flex": "1", "overflow": "auto" } };
const __default__ = vue.defineComponent({
  name: "EvSelect"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: {
    ...defaultProps.defaultProps,
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  emits: ["update:modelValue", "onChange"],
  setup(__props, { emit }) {
    const props = __props;
    const slotSearch = !!vue.useSlots().search;
    const { columns, disabled } = vue.toRefs(props);
    const showPicker = vue.ref(false);
    const slotSelected = vue.ref("");
    const cacheSelected = vue.ref(null);
    const selected = vue.computed({
      get: () => {
        cacheSelected.value = props.modelValue ? props.modelValue + "" : null;
        slotSelected.value = props.modelValue ? props.modelValue + "" : "";
        return core.stringToArray(props.modelValue + "");
      },
      set: (val) => {
        slotSelected.value = val[0];
      }
    });
    const selectedLabel = vue.computed(() => {
      return core.selectDictLabels(columns == null ? void 0 : columns.value, selected.value);
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
      const _component_van_picker = vue.resolveComponent("van-picker");
      const _component_van_popup = vue.resolveComponent("van-popup");
      return vue.openBlock(), vue.createElementBlock("div", null, [
        vue.createVNode(vue.unref(index.EvInput), {
          modelValue: vue.unref(selectedLabel),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(selectedLabel) ? selectedLabel.value = $event : null),
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
          button: vue.withCtx(() => [
            _hoisted_1
          ]),
          _: 1
        }, 8, ["modelValue", "label", "placeholder", "required", "rules"]),
        vue.createVNode(_component_van_popup, {
          show: showPicker.value,
          "onUpdate:show": _cache[4] || (_cache[4] = ($event) => showPicker.value = $event),
          round: "",
          position: "bottom",
          teleport: _ctx.attrs.teleport,
          style: { height: "60%", display: "flex", "flex-direction": "column" }
        }, {
          default: vue.withCtx(() => [
            slotSearch ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.createElementVNode("button", {
                class: "van-picker__cancel van-haptics-feedback",
                onClick: _cache[1] || (_cache[1] = ($event) => showPicker.value = false)
              }, " 取消 "),
              vue.createElementVNode("div", _hoisted_3, vue.toDisplayString(_ctx.label), 1),
              vue.createElementVNode("button", {
                class: "van-picker__confirm van-haptics-feedback",
                onClick: onConfirmSlot
              }, " 确认 ")
            ])) : vue.createCommentVNode("", true),
            vue.renderSlot(_ctx.$slots, "search", {}, void 0, true),
            vue.createElementVNode("div", _hoisted_4, [
              vue.createVNode(_component_van_picker, {
                ref: "picker",
                modelValue: vue.unref(selected),
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(selected) ? selected.value = $event : null),
                title: _ctx.label,
                columns: vue.unref(columns),
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
exports.default = _sfc_main;
