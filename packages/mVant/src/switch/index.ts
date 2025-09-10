import _switch from './src/index.vue';

import { withInstall } from '@elong-ui/utils';
import { Switch } from 'vant';

// export const EvSwitch = withInstall(_switch);
export const EvSwitch = [withInstall(_switch), Switch];

export default EvSwitch;

declare module 'vue' {
  export interface GlobalComponents {
    EvSwitch: typeof EvSwitch;
  }
}
