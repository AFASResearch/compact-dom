///<reference path="../../src/typings/chai/chai.d.ts" />
///<reference path="../../src/typings/mocha/mocha.d.ts" />

import chai = require("chai");
import {Readable} from "stream";

import * as createConverter from "../../src/to-hyperscript/stream-converter";

let expect = chai.expect;

describe("createConverter", () => {

  it("should replace the simpelest case", (done: Function) => {
    var converter = createConverter({});
    
    var rs = new Readable();
    rs.push("h.div()");
    rs.push(null);

    var stream = rs.pipe(converter);//.pipe(process.stdout);

    let chunkCount = 0;
    const expectedChunks = ['h("div")'];
        
    stream.on("readable", () => {
      let chunk = stream.read();
      if (chunk === null) {
        expect(chunkCount).to.equal(expectedChunks.length);
        done();
      } else {
        expect(chunk.toString()).to.equal(expectedChunks[chunkCount]);
        chunkCount++;
      }
    });

  });  
});
