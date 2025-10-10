/**
 * Generate all valid sequences of n pairs of '<' and '>' with proper nesting.
 * @param {number} n
 * @returns {string[]}
 */
function generateAngleBrackets(n) {
  const res = [];
  function backtrack(open, close, cur) {
    if (open === n && close === n) {
      res.push(cur);
      return;
    }
    if (open < n) backtrack(open + 1, close, cur + "<");
    if (close < open) backtrack(open, close + 1, cur + ">");
  }
  backtrack(0, 0, "");
  return res;
}

// Examples
console.log(generateAngleBrackets(1)); // ["<>"]
console.log(generateAngleBrackets(2)); // ["<><>", "<<>>"]
console.log(generateAngleBrackets(3)); // ["<<<>>>","<<><>>","<<>><>","<><<>>","<><><>"]

function generateValidBrackets(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(current + "<", open + 1, close);
    }

    if (close < open) {
      backtrack(current + ">", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
}

// Test
console.log(generateValidBrackets(2));
// Output: ['<><>', '<<>>']

console.log(generateValidBrackets(3));
// Output: ['<><><>', '<><>>', '<<><>>', '<<>><>', '<<<>>>']

//---------------------------------------------------
// solution: areBracketsProperlyMatched
// 1. define "bracketsObj" so can hold opening value and key and end value
// 2. stack to hold openeing value and clear this at when we found end value
// 3. loop to iterate each word and check if closing bracket so can remove elem from stack and match the end, if not then return
// 4. push in stack for each opening value only and while compare get last value so compare and pop arr 
function areBracketsProperlyMatched(code_snippet) {
  // Write your code here
  //  //Space complexity: O(1) for look-up
  let bracketsObj = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  let stack = []; //Space complexity: O(n)

  // Time complexity: O(n)
  for (const char of code_snippet) {
    if ([")", "(", "{", "}", "[", "]"].includes(char)) {
      if (bracketsObj[char]) {
        if (bracketsObj[char] !== stack.pop()) {
          return false;
        }
      } else {
        stack.push(char);
      }
    }
  }

  // return stack.length === 0 ? 1 : 0; 
  return stack.length === 0;
}
console.log(areBracketsProperlyMatched("if (a[0] > b[1]) { doSomething(); }")); // 1
console.log(areBracketsProperlyMatched("int x = 42; // no brackets here"));     // 1
console.log(areBracketsProperlyMatched("() {} []"));                            // 1
console.log(areBracketsProperlyMatched("([)]"));                                 // 0
console.log(areBracketsProperlyMatched("(]"));                                   // 0
// Time complexity: O(n) and Space complexity: O(n)
//-------------------------------------Day 6 End---------------------------------------


// 2. isAlphabeticPalindrome
function isAlphabeticPalindrome(code) {
  // Write your code here
  code = code.toLowerCase();
  let filterStr = "";
  for (const char of code) {
    if (char >= "a" && char <= "z") {
      filterStr += char;
    }
  }

  return filterStr === filterStr.split("").reverse().join("");
}
console.log(isAlphabeticPalindrome("A1b2B!a"));
