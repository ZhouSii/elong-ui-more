import _title from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvTitle = withInstall(_title);

export default EvTitle;

declare module 'vue' {
  export interface GlobalComponents {
    EvTitle: typeof EvTitle;
  }
}
