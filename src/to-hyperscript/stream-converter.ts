import {Converter, createConverter} from "./converter";
import {Options} from "./options";
import {Transform} from "stream";

class StreamConverter extends Transform {
  lastLine: string;
  converter: Converter;

  constructor(converter: Converter) {
    super({});
    this.lastLine = "";
    this.converter = converter;
  }

  _transform(chunk: string|Buffer, encoding: string, done: Function) {
    if (chunk === null) {
      this.push(this.converter.convertLine(this.lastLine));
      this.push(null);
    } else {
      while (true) {
        var chunkString = chunk.toString();
        var index = chunkString.indexOf("\n");
        if (index === -1) {
          this.lastLine = this.lastLine + chunkString;
          break;
        }
        this.push(this.converter.convertLine(this.lastLine + chunkString.substr(0, index+1)));
        chunk = chunkString.substr(index + 1);
        this.lastLine = "";
      }
    }
    done();
  }

  _flush(done:Function) {
    this.push(this.converter.convertLine(this.lastLine));
    this.push(null);
    done();
  }
};

let createStreamConverter = function(options: Options): Transform {
  return new StreamConverter(createConverter(options));
};

export {createStreamConverter};