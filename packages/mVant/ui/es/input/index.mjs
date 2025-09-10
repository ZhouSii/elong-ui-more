import { withInstall } from "../utils/common/with-install.mjs";
import { Field } from "vant";
import _input from "./src/index.vue.mjs";
const EvInput = withInstall({
  ..._input,
  __dependencies__: [Field]
});
export {
  EvInput,
  EvInput as default
};
