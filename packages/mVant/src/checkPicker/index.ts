import _checkPicker from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvCheckPicker = withInstall(_checkPicker);

export default EvCheckPicker;

declare module 'vue' {
  export interface GlobalComponents {
    EvCheckPicker: typeof EvCheckPicker;
  }
}
