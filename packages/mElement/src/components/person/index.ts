import { withInstall } from '@elong-ui/utils';
import { ElSelectV2 } from 'element-plus';

import selectPerson from './src/index.vue';

export const NmPerson = withInstall({
  ...selectPerson,
  __dependencies__: [ElSelectV2]
});

export default NmPerson;

export type NmPerson = typeof NmPerson;
