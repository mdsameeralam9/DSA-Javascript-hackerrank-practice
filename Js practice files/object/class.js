//1. Leetcode - Min Stack
// Min Stack using single stack of pairs: [value, minSoFar]
// simplest approach but the problem is space complexity is O(2*n) - because we store [val, val]

/**
For the pair-based MinStack (stack stores [value, minSoFar] at each push):

# Time complexit
push: O(1) — compute min with last pair and append one pair.
pop: O(1) — remove the last pair.
top: O(1) — read last pair’s value.
getMin: O(1) — read last pair’s min.

# Space complexity
O(n) auxiliary — the stack holds one pair per pushed element, so it grows linearly with the number of elements.

*/
class MinStackSimplestApproach {
  constructor() {
    // Stack of pairs: [val, minValAtThisNode]
    this.s = [];
  }

  // Initializes the stack object (already handled by constructor in JS)
  // MinStack() {}  // Not needed in JS

  // void push(int val)
  push(val) {
    if (this.s.length === 0) {
      // First element: min is the value itself
      this.s.push([val, val]);
    } else {
      const currentMin = this.s[this.s.length - 1][1];
      const minVal = Math.min(val, currentMin);
      this.s.push([val, minVal]);
    }
  }

  // void pop()
  pop() {
    if (this.s.length === 0) return; 
    this.s.pop();
  }

  // int top()
  top() {
    if (this.s.length === 0) return null;
    return this.s[this.s.length - 1][0];
  }

  // int getMin()
  getMin() {
    if (this.s.length === 0) return null;
    return this.s[this.s.length - 1][1];
  }
}




/**
 * Simplified Min Stack - Mathematical Encoding Approach
 * O(1) time for all operations, O(1) auxiliary space
 */
class MinStack {
  constructor() {
    this.stack = [];
    this.minValue = null;
  }

  push(value) {
    if (this.stack.length === 0) {
      this.stack.push(value);
      this.minValue = value;
    } else if (value < this.minValue) {
      // Encode: store 2*value - minValue
      this.stack.push(2 * value - this.minValue);
      this.minValue = value;
    } else {
      this.stack.push(value);
    }
  }

  pop() {
    if (this.stack.length === 0) return;

    const topValue = this.stack.pop();
    if (topValue < this.minValue) {
      // Decode: restore previous min
      this.minValue = 2 * this.minValue - topValue;
    }
  }

  top() {
    if (this.stack.length === 0) return null;

    const topValue = this.stack[this.stack.length - 1];
    return topValue < this.minValue ? this.minValue : topValue;
  }

  getMin() {
    return this.minValue;
  }
}

// Create new MinStack
const minStack = new MinStack();

// Push elements
minStack.push(5); // Normal push
minStack.push(3); // Normal push
minStack.push(1); // Encodes previous min (3) as: 2*1 - 3 = -1

// Operations
console.log(minStack.getMin()); // 1
console.log(minStack.top()); // 1 (decoded from minValue)
minStack.pop(); // Restores min to 3
console.log(minStack.getMin()); // 3

/**
 * Min Stack Implementation - Single Stack with Objects
 * Clean and readable approach storing {value, min} pairs
 * Time: O(1) for all operations, Space: O(n)
 */
class MinStack2 {
  constructor() {
    this.stack = []; // Each element: {value: x, min: y}
  }

  push(value) {
    // Calculate the minimum for this level
    const currentMin =
      this.stack.length === 0 ? value : Math.min(value, this.getMin());

    // Push object containing both value and minimum at this level
    this.stack.push({
      value: value,
      min: currentMin,
    });
  }

  pop() {
    if (this.stack.length === 0) return null;
    return this.stack.pop().value;
  }

  top() {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1].value;
  }

  getMin() {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1].min;
  }

  // Helper methods
  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  getState() {
    return {
      stack: [...this.stack],
      currentMin: this.getMin(),
      size: this.size(),
    };
  }
}

/**
 * Min Stack Implementation - Two-Stack Approach
 * Most intuitive and commonly used solution in interviews
 * Time: O(1) for all operations, Space: O(n)
 */
class MinStack3 {
  constructor() {
    this.mainStack = []; // Stores all elements
    this.minStack = []; // Stores minimum values
  }

  push(value) {
    // Always push to main stack
    this.mainStack.push(value);

    // Push to min stack if it's empty OR value is <= current minimum
    // Note: We use <= to handle duplicate minimums correctly
    if (
      this.minStack.length === 0 ||
      value <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(value);
    }
  }

  pop() {
    if (this.mainStack.length === 0) return null;

    const poppedValue = this.mainStack.pop();

    // If popped value was the minimum, remove it from min stack too
    if (
      this.minStack.length > 0 &&
      poppedValue === this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.pop();
    }

    return poppedValue;
  }

  top() {
    return this.mainStack.length > 0
      ? this.mainStack[this.mainStack.length - 1]
      : null;
  }

  getMin() {
    return this.minStack.length > 0
      ? this.minStack[this.minStack.length - 1]
      : null;
  }

  // Helper methods
  isEmpty() {
    return this.mainStack.length === 0;
  }

  size() {
    return this.mainStack.length;
  }

  // Debug method to see both stacks
  getState() {
    return {
      main: [...this.mainStack],
      min: [...this.minStack],
      currentMin: this.getMin(),
      size: this.size(),
    };
  }
}
