import { withInstall } from '@elong-ui/utils';
import { ElTable } from 'element-plus';

import table from './src/index.vue';

export const NmTable = withInstall({
  ...table,
  __dependencies__: [ElTable]
});

export default NmTable;

export type NmTable = typeof NmTable;
