import { withInstall } from '@elong-ui/utils';
import { Field } from 'vant';
import _input from './src/index.vue';

export const EvInput = withInstall({
  ..._input,
  __dependencies__: [Field]
});

export default EvInput;

declare module 'vue' {
  export interface GlobalComponents {
    EvInput: typeof EvInput;
  }
}
