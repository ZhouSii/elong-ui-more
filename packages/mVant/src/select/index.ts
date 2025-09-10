import _select from './src/index.vue';

import { withInstall } from '@elong-ui/utils';
import { Popup, Picker } from 'vant';

// export const EvSelect = withInstall(_select);
// export const EvSelect = [withInstall(_select), Popup, Picker];
export const EvSelect = withInstall({
  ..._select,
  __dependencies__: [Popup, Picker]
});

export default EvSelect;

declare module 'vue' {
  export interface GlobalComponents {
    EvSelect: typeof EvSelect;
  }
}
