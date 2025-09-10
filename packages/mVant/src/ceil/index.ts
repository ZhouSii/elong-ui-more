import _ceil from './src/index';

import { withInstall } from '@elong-ui/utils';

export const EvCeil = withInstall(_ceil);

export default EvCeil;

declare module 'vue' {
  export interface GlobalComponents {
    EvCeil: typeof EvCeil;
  }
}
