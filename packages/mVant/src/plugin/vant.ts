import { App as VM } from 'vue';
import {
  Field,
  RadioGroup,
  Radio,
  Popup,
  Picker,
  Switch,
  Collapse,
  CollapseItem,
  Uploader,
  Icon,
  TextEllipsis,
  Calendar,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  DatePicker,
  PickerGroup
} from 'vant';

const plugins = [
  Field,
  RadioGroup,
  Radio,
  Popup,
  Picker,
  Switch,
  Collapse,
  CollapseItem,
  Uploader,
  Icon,
  TextEllipsis,
  Calendar,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  DatePicker,
  PickerGroup
];

export const vantPlugins = {
  install: function (vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item);
    });
  }
};
