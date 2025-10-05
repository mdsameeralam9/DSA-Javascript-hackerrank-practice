/*
 * Complete the function below.
 * The MinTrackingStack should be implemented as a class or object.
 */
function solve(operations) {
  const mainStack = [];
  const minStack = [];
  const result = [];

  function push(x) {
    mainStack.push(x);
    if (minStack.length === 0 || x <= minStack[minStack.length - 1]) {
      minStack.push(x);
    }
  }

  function pop() {
    if (mainStack.length > 0) {
      const popped = mainStack.pop();
      if (popped === minStack[minStack.length - 1]) {
        minStack.pop();
      }
    }
  }

  function top() {
    if (mainStack.length > 0) {
      return mainStack[mainStack.length - 1];
    }
    return -1; // Or handle as an empty stack error
  }

  function getMin() {
    if (minStack.length > 0) {
      return minStack[minStack.length - 1];
    }
    return -1; // Or handle as an empty stack error
  }

  for (const op of operations) {
    const parts = op.split(' ');
    const command = parts[0];
    const value = parts[1] ? parseInt(parts[1]) : undefined;

    switch (command) {
      case 'push':
        push(value);
        break;
      case 'pop':
        pop();
        break;
      case 'top':
        result.push(top());
        break;
      case 'getMin':
        result.push(getMin());
        break;
    }
  }

  return result;
}

// Example usage from the problem description:
// const n = 10;
// const operations = ['push 2', 'push 0', 'push 3', 'push 0', 'getMin', 'pop', 'getMin', 'pop', 'top', 'getMin'];
// const output = solve(operations);
// console.log(output); // [0, 0, 0, 0]

// Sample Input 0
// const operations0 = ['push 5', 'getMin'];
// console.log(solve(operations0)); // [5]

// Sample Input 1
// const operations1 = ['push 0', 'top'];
// console.log(solve(operations1)); // [0]
