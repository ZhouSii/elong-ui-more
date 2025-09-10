import _bMap from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvBMap = withInstall(_bMap);

export default EvBMap;

declare module 'vue' {
  export interface GlobalComponents {
    EvBMap: typeof EvBMap;
  }
}
