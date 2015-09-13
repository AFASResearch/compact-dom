///<reference path="../typings/node/node.d.ts" />

import {createConverter, Converter} from "./to-hyperscript/converter";
import {createStreamConverter} from "./to-hyperscript/stream-converter";
import {Options} from "./to-hyperscript/Options";
import {Transform} from "stream";

let toHyperscript = {
  createConverter, 
  createStreamConverter
};

export { Options, Converter, toHyperscript };