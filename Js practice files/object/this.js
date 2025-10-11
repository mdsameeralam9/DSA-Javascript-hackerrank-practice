const defination =  `In JavaScript, this refers to the current execution context’s receiver object 
and its value depends on how a function is called, not where it’s defined.`

`Global scope:
1. In modules, top-level this is undefined by default; 
2. in non-module scripts in browsers, top-level this is the window object
3. in non-strict and strict mode the is window object.
`

`Function calls:
1.Strict mode: In "strict mode", calling a plain function f() sets this to undefined; 
2.Sloppy mode: In non-strict mode, calling a plain function f() sets this to the global object.
`
// strict mode
function strictFunc() {
  'use strict';
  return this;
}
console.log(strictFunc() === undefined); // true

// sloppy mode or non-strict mode
function sloppyFunc() {
  return this;
}
console.log(sloppyFunc() === window); // true


`
Method calls:
When a function is called as user.fn(), this is the object before the dot (user) for that call.
`
const user = {
    name: "Sameer",
    email: "sam@gamil.com",
    getInfo: function(){
        return `${this.name} ${this.email}`
    }
};
user.getInfo()   


`
Constructor calls or function Constructor:
1. With new Fn(...), this is the newly created instance that inherits 
from Fn.prototype during the constructor execution.

2. When a function is called with the new keyword, it acts as a constructor. 
In this case, this refers to the newly created instance of the object.

`
function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');
const bob = new Person('Bob');

console.log(alice.name); // "Alice"
console.log(bob.name);   // "Bob"
// NOTE: this === alice/bob inside Person constructor 



`NOTE: The reason for the difference-
1. Classic Script (<script>): In a classic, non-module script, a top-level function call like sloppyFunc() 
operates in "sloppy mode" and defaults its this value to the global object, which is window in a browser.

2. ES Module (<script type="module">): In an ES module, strict mode is active by default. 
This means that a function called without an explicit context will have its 
this value set to undefined, not the global window object.

`