const person = {
  fullName: function(...city) {
    console.log(...city)
    console.log(city)
  }
};

const person1 = {
  firstName: 'John',
  lastName: 'Doe'
};



// Use apply() to "borrow" the fullName method and use it for person1
const resultApply = person.fullName.apply(person1, ['Oslo', 'Norway']);
console.log(resultApply); // "John Doe from Oslo, Norway"
