import {Options} from "./options";

interface Converter {
  convertLine: (line:string) => string;
  convert: (script:string) => string;
}

let createConverter = (options:Options) : Converter => {
  
  const regex = new RegExp("\\b" + (options.mithril?"m":"h") + "((\\.[a-z]\\w*)+)\\(\\s*\\)?", "g");
  
  const camelCase = new RegExp("([a-z])([A-Z])", "g");
  
  let convertToDash = (match:string, before:string, after:string) => {
    return before+"-"+after.toLowerCase();
  }
  
  let dasherize = (s: string) => {
    return s.replace(camelCase, convertToDash);
  }
  
  let convertMatch = (match:string, group1: string) => {
    var addComma = match[match.length-1] !== ")";
    return "h(\"" + dasherize(group1.substr(1)) + "\"" + (addComma ? ", " : ")");
  }
  
  let convertLine = (line: string) => {
    return line.replace(regex, convertMatch);
  }
  
  let convert = (script:string) => {
    return script.split("\n").map(convertLine).join("\n");
  }
  
  return {convert, convertLine};
};

export {createConverter, Converter};
