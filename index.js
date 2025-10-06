/**
Given a sorted array of positive integers and a target value, 
count the number of pairs (i, j) where i < j and array[i] + array[j] <= target.
*/

function countAffordablePairs(prices, budget) {
  // Write your code here
  let count = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let k = i + 1; k < prices.length; k++) {
      if (prices[i] + prices[k] <= budget) {
        count++;
      }
    }
  }
  return count;
}

console.log(countAffordablePairs([1, 2, 3, 4, 5], 7)); // 8
//Time complexity: O(n2) 
// Space complexity: O(1)


// O(m log m) time, O(1) extra space (in-place sort)
function countAffordablePairsOptimised(prices, budget) {
  prices.sort((a, b) => a - b);
  let i = 0, r = prices.length - 1, count = 0;
  while (i < r) {
    const sum = prices[i] + prices[r];
    if (sum <= budget) {
      count += (r - i);
      i += 1; // move left up to count new base pairs
    } else {
      r -= 1; // need a smaller right to reduce sum
    }
  }
  return count;
}

console.log(countAffordablePairsOptimised([1, 2, 3, 4, 5], 7)); // 8

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

