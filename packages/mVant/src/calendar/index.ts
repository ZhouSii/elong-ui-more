import _calendar from './src/index.vue';

import { withInstall } from '@elong-ui/utils';

export const EvCalendar = withInstall(_calendar);

export default EvCalendar;

declare module 'vue' {
  export interface GlobalComponents {
    EvCalendar: typeof EvCalendar;
  }
}
