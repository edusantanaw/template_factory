import english from "./english.json";
import portuguese from "./portuguese.json";
import template from "./template.json";

const VITE_LANGUAGE = import.meta.env.VITE_LANGUAGE;
const VITE_IS_TEMPLATE = Number(import.meta.env.VITE_IS_TEMPLATE ?? 0);

let CURRENT_LANGUAGE = english;

switch (VITE_LANGUAGE) {
  case "ENGLISH": {
    CURRENT_LANGUAGE = english;
    break;
  }
  case "PORTUGUESE": {
    CURRENT_LANGUAGE = portuguese;
    break;
  }
  default: {
    CURRENT_LANGUAGE = template;
  }
}

if (VITE_IS_TEMPLATE === 1) CURRENT_LANGUAGE = template;

export default CURRENT_LANGUAGE;
