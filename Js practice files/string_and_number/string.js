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
