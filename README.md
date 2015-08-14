# compact-dom

Compact-DOM is way to represent a DOM tree in Javascript. The following example shows how it looks and how it compares to plain HTML.

Compact-DOM:

    h.div(
      h.input({type: "text", value: you, oninput: handleNameInput}),
      h.p.output("Hello " + you)
    )

HTML:

    <div>
      <input type="text" value="{{you}}" oninput="handleNameInput()" />
      <p class="output">Hello {{you}}</p>
    </div>
  
## Use

Compact-DOM can not run natively in browsers, at least not until they all support the [ES6 Proxy Object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
Thus Javascript code with Compact-DOM needs to be transpiled.

This project aims to provide a transpiler from Compact-DOM to hyperscript, so it can be used by frameworks such as [maquette](http://maquettejs.org) or [mithril](https://lhorie.github.io/mithril/).
