function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');
const bob = new Person('Bob');

console.log(alice.name); // "Alice"
console.log(bob.name);   // "Bob"
