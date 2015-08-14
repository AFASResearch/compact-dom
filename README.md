# compact-dom

Compact-DOM is a programmer-friendly way to represent a DOM tree in Javascript. The following example shows how it looks and how it compares to plain HTML.

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

Compact-DOM does not run natively in browsers, at least not until they all support the [ES6 Proxy Object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
Thus Javascript code which contains Compact-DOM needs to be transpiled.

This project aims to provide a transpiler from Compact-DOM to hyperscript, so it can be used by frameworks such as [maquette](http://maquettejs.org) and [mithril](https://lhorie.github.io/mithril/).

## Semantics

The transpiler searches for all occurrences of **h.*tagname-and-css-classes*(** and replaces them with **h("*tagname-and-css-classes*",**, where tagnames and css classes are 'dasherized'. For mithril, the **m** can be used instead of the **h**. 
