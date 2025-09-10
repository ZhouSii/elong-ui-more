import * as components from "./components.mjs";
import { EvInput } from "./input/index.mjs";
import { EvSelect } from "./select/index.mjs";
import { EvTitle } from "./title/index.mjs";
const index = {
  install: (app) => {
    console.log("mVant install", components);
    for (const c in components) {
      app.use(components[c]);
    }
  }
};
export {
  EvInput,
  EvSelect,
  EvTitle,
  index as default
};
