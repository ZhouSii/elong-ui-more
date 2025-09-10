import { withInstall } from '@elong-ui/utils';
import { ElDialog } from 'element-plus';

import dialog from './src/index.vue';

export const NmDialog = withInstall({
  ...dialog,
  __dependencies__: [ElDialog]
});

export default NmDialog;

export type NmDialog = typeof NmDialog;
