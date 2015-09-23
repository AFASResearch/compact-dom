import {Options} from "./options";

let createRegExp = (options: Options) => {
  const prefix = (options.prefix || "h");
  return new RegExp("\\b" + prefix + "((\\.[a-z]\\w*)+)\\(\\s*\\)?", "g");
}

export {createRegExp};
