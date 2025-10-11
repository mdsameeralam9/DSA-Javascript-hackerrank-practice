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


`
Class methods:
Inside class instance methods, this refers to the instance; 
in static methods, this refers to the class constructor function itself.
`
class Car {
  constructor(make, model) {
    // `this` refers to the new object being created
    this.make = make;
    this.model = model;
  }

  // An instance method to display the car's details
  displayDetails() {
    // Inside here, `this` refers to the specific instance (`myCar` or `anotherCar`)
    console.log(`This car is a ${this.make} ${this.model}.`);
  }
}

// Create two separate instances
const myCar = new Car('Honda', 'Civic');
const anotherCar = new Car('Toyota', 'Camry');

myCar.displayDetails(); // "This car is a Honda Civic." (this === myCar)
anotherCar.displayDetails(); // "This car is a Toyota Camry." (this === anotherCar)

// static class method - MathOperations
class MathOperations {
  // A static method to add two numbers
  static add(a, b) {
    // `this` refers to the class (`MathOperations`)
    console.log(this === MathOperations); // true
    return a + b;
  }

  // An instance method to multiply with a stored value
  multiply(value) {
    // `this` refers to the instance
    return this.storedValue * value;
  }
}

// Access the static method directly on the class
console.log(MathOperations.add(5, 3)); // 8

// Trying to call a static method on an instance will fail
const myOps = new MathOperations();
// myOps.add(5, 3); // TypeError: myOps.add is not a function

// Static methods are commonly used for utility functions that don't need access to instance data,
// like the built-in `Math` object methods (`Math.random()`, `Math.max()`, etc.).


`NOTE: The reason for the difference-
1. Classic Script (<script>): In a classic, non-module script, a top-level function call like sloppyFunc() 
operates in "sloppy mode" and defaults its this value to the global object, which is window in a browser.

2. ES Module (<script type="module">): In an ES module, strict mode is active by default. 
This means that a function called without an explicit context will have its 
this value set to undefined, not the global window object.

`