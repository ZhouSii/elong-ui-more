import _upload from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvUpload = withInstall(_upload);

export default EvUpload;

declare module 'vue' {
  export interface GlobalComponents {
    EvUpload: typeof EvUpload;
  }
}
