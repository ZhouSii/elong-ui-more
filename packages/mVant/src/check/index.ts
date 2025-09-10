import _check from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvCheck = withInstall(_check);

export default EvCheck;

declare module 'vue' {
  export interface GlobalComponents {
    EvCheck: typeof EvCheck;
  }
}
