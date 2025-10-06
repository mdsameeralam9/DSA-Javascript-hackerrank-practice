/**
Given a sorted array of positive integers and a target value, 
count the number of pairs (i, j) where i < j and array[i] + array[j] <= target.
*/

function countAffordablePairs(prices, budget) {
    // Write your code here
    let count = 0;
    for(let i=0; i<prices.length; i++){
           for(let k=i+1; k<prices.length; k++){
            if(prices[i]+prices[k] <= budget){
                count++;
            }
        
    }
    }
    return count

}

console.log(countAffordablePairs([1, 2, 3, 4, 5], 7)); // 8