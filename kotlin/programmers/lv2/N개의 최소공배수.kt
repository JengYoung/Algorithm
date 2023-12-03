fun getDivisor(value: Int): IntArray {
  var result: IntArray = IntArray(101, {0});
  var now = value;
  
  for (i in 2..value) {
      while (now % i == 0) {
          now = now / i;
          result[i] += 1;
      }
  }
  
  return result;
}

class Solution {
  fun solution(arr: IntArray): Int {
      var resultDivisors = IntArray(101, {0});
      
      for (i in arr) {
          var divisors = getDivisor(i);
          
          divisors.forEachIndexed { idx, v -> 
              resultDivisors[idx] = Math.max(resultDivisors[idx], v);
          }
      }
      
      return resultDivisors.foldIndexed(1) { idx, acc, cur -> 
          acc * Math.pow(idx.toDouble(), cur.toDouble()).toInt() 
      }
  }
}