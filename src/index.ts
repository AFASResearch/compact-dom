import {createConverter, Converter} from "./to-hyperscript/converter";
import {createStreamConverter} from "./to-hyperscript/stream-converter";
import {Options} from "./options";
import {createRegExp} from "./regexp";
import {Transform} from "stream";

let toHyperscript = {
  createConverter, 
  createStreamConverter
};

export { Options, Converter, createRegExp, toHyperscript };