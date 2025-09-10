import _radio from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

import { RadioGroup, Radio } from 'vant';

// export const EvRadio = withInstall(_radio);
export const EvRadio = [withInstall(_radio), RadioGroup, Radio];

export default EvRadio;

declare module 'vue' {
  export interface GlobalComponents {
    EvRadio: typeof EvRadio;
  }
}
