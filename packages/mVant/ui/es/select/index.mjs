import _select from "./src/index.vue.mjs";
import { withInstall } from "../utils/common/with-install.mjs";
import { Popup, Picker } from "vant";
const EvSelect = withInstall({
  ..._select,
  __dependencies__: [Popup, Picker]
});
export {
  EvSelect,
  EvSelect as default
};
