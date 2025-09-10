import _date from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvDate = withInstall(_date);

export default EvDate;

declare module 'vue' {
  export interface GlobalComponents {
    EvDate: typeof EvDate;
  }
}
