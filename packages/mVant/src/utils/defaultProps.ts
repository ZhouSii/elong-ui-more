export const defaultProps = {
  modelValue: {
    type: [String, Number, Array as any, Boolean],
    default: ''
  },
  customerType: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  keyWord: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: [String, Number],
    default: 90
  },
  columns: {
    type: Array as any,
    default: []
  },
  // 选择框形状
  shape: {
    type: String as any,
    default: 'square'
  },
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  scoped: {
    type: String,
    default: ''
  },
  attrs: {
    type: Object,
    default: () => ({})
  }
};
