import {createConverter} from "./to-hyperscript/converter";
import * as createStreamConverter from "./to-hyperscript/stream-converter";

var compactDom = {
  toHyperscript: {
    createConverter, 
    createStreamConverter
  }
}

export = compactDom;