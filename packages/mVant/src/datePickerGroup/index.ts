import _datePickerGroup from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvDatePickerGroup = withInstall(_datePickerGroup);

export default EvDatePickerGroup;

declare module 'vue' {
  export interface GlobalComponents {
    EvDatePickerGroup: typeof EvDatePickerGroup;
  }
}
