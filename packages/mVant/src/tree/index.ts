import _tree from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvTree = withInstall(_tree);

export default EvTree;

declare module 'vue' {
  export interface GlobalComponents {
    EvTree: typeof EvTree;
  }
}
