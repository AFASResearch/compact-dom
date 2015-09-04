///<reference path="../../src/typings/chai/chai.d.ts" />
///<reference path="../../src/typings/mocha/mocha.d.ts" />

import chai = require("chai");

import { createConverter } from "../../src/to-hyperscript/converter";

let expect = chai.expect;

let converter = createConverter({});

describe("convertLine", () => {

  it("should not change lines without compact-dom", () => {
    const line = 'h("div", [h("input", {type: "text", placeholder: "name?", value: you}),h("p.output", ["Hello " + (you || "you") + "!"])]);';
    expect(converter.convertLine(line)).to.equal(line);
  });
  
  it("should replace the simpelest case", () => {
    const line = 'h.div()';
    expect(converter.convertLine(line)).to.equal('h("div")');
    const line2 = 'h.div( )';
    expect(converter.convertLine(line2)).to.equal('h("div")');
  });
  
  it("should replace a tag with classnames and content", () => {
    const line = 'h.a.button.primary({href:"#"}, ["Click me"])';
    expect(converter.convertLine(line)).to.equal('h("a.button.primary", {href:"#"}, ["Click me"])');
  });
  
  it("should dasherize tagnames and classnames", () => {
    const line = 'h.myButton.extraPriority("Click me")';
    expect(converter.convertLine(line)).to.equal('h("my-button.extra-priority", "Click me")');
  });
  
  it("should work with multiple tags on one line", () => {
    const line = 'h.div(h.p([h.a("click me")]))';
    expect(converter.convertLine(line)).to.equal('h("div", h("p", [h("a", "click me")]))');
  });
  
  it("should convert a script with multiple lines", () => {
    const script = `
function renderMaquette() {
  return h.div(
    h.input({type: "text", value: you, oninput: handleNameInput}),
    h.p.output("Hello " + you)
  );
}`;
    const expected = `
function renderMaquette() {
  return h("div", 
    h("input", {type: "text", value: you, oninput: handleNameInput}),
    h("p.output", "Hello " + you)
  );
}`;
    expect(converter.convert(script)).to.equal(expected);
  });
  
});
