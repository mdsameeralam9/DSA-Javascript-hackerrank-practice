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
`
Event listeners:
In DOM event handlers set via element.addEventListener, inside a non-arrow handler 
this is the element receiving the event; arrow handlers use lexical this and 
usually are undefined in modules.

<button class="action-button">Click Me</button>
<button class="action-button">Click Me</button>
<button class="action-button">Click Me</button>

<script>
  const buttons = document.querySelectorAll('.action-button');

  // Use a regular function for the handler
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Inside here, 'this' is the specific button that was clicked
      this.textContent = 'Clicked!';
      this.disabled = true;
      console.log(this); // Logs the button element
    });
  });
</script>
`

`
call/apply/bind:
0. call(), apply(), and bind() are methods in JavaScript that are used to explicitly 
set the this value inside a function. This gives you control over the function's execution context, 
which is especially useful when the default this binding is not what you need. 

1. call/apply invoke a function with an explicit this; 
2. bind returns a new function permanently bound to the provided this.

`
const userX = {
    name: 'Sam',
    email: 'sam@gmail.com',
    getUserInfo() {
      return `${this.name} ${this.email}`;
    },
};

const user2 = {
    name: 'John',
    email: 'John@gmail.com',
};


console.log(userX.getUserInfo()) 
// call
console.log(userX.getUserInfo.call(user2))

// apply
const user3 = {
    name: 'Hero',
    email: 'Hero@gmail.com',
};
console.log(userX.getUserInfo.apply(user3))

// bind
const user4 = {
    name: 'Raj',
    email: 'Raj@gmail.com',
};
const newInfoFun = userX.getUserInfo.bind(user4);
console.log(user4)
console.log(newInfoFun())

//  ----------------------- example 2 ------------------------
const person = {
  fullName: function(city, country) {
    return this.firstName + ' ' + this.lastName + ' from ' + city + ', ' + country;
  }
};

const person1 = {
  firstName: 'John',
  lastName: 'Doe'
};

// Use call() to "borrow" the fullName method and use it for person1
const result = person.fullName.call(person1, 'Oslo', 'Norway');
console.log(result); // "John Doe from Oslo, Norway"

// Use apply() to "borrow" the fullName method and use it for person1
const resultApply = person.fullName.apply(person1, ['Oslo', 'Norway']);
console.log(resultApply); // "John Doe from Oslo, Norway"

// Use bind() to "borrow" the fullName method and use it for person1
const resultBindFn = person.fullName.bind(person1, 'Oslo', 'Norway');
console.log(resultBindFn()); // "John Doe from Oslo, Norway"


`
Arrow functions:
Arrow functions capture this lexically from the surrounding scope at creation time 
and cannot be rebound by call/apply/bind.

1. Do not have their own this binding.
2. They inherit the this value from their lexical scope—the parent scope where they were defined.
3. Once an arrow function is defined, its this is permanently set and cannot be overridden

`
const personX = {
  name: 'John',
  // Regular method: `this` is the object itself (person)
  greetRegular: function() {
    console.log(`Hello, my name is ${this.name}.`);
  },
  // Arrow method: `this` is inherited from the global scope (or undefined in a module)
  greetArrow: () => {
    console.log(`Hello, my name is ${this.name}.`);
  },
};

const anotherPerson = {
  name: 'Jane',
};

// --- Part 1: Default behavior ---

console.log("--- Default Behavior ---");
personX.greetRegular(); // Output: "Hello, my name is John." (Correct)
personX.greetArrow();   // Output: "Hello, my name is undefined." (Incorrect, `this` is window or undefined)

// --- Part 2: Attempting to rebind `this` with .call() ---

console.log("\n--- Rebinding with .call() ---");

// This works for the regular function
personX.greetRegular.call(anotherPerson); // Output: "Hello, my name is Jane." (Success)

// This does NOT work for the arrow function
personX.greetArrow.call(anotherPerson);   // Output: "Hello, my name is undefined." (Failure)


`
React components:
In React class components, this refers to the component instance; methods often need binding or 
class fields to preserve this; in function components/hooks, there is no this for component 
state/props; closures replace this usage.
`

`NOTE: The reason for the difference-
1. Classic Script (<script>): In a classic, non-module script, a top-level function call like sloppyFunc() 
operates in "sloppy mode" and defaults its this value to the global object, which is window in a browser.

2. ES Module (<script type="module">): In an ES module, strict mode is active by default. 
This means that a function called without an explicit context will have its 
this value set to undefined, not the global window object.

`