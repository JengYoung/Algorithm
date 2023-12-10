class Solution {
  fun solution(number: Int, limit: Int, power: Int): Int {
      var arr = IntArray(number + 1, { value -> getDivisorCount(value) });
      
      var total =  arr.reduce { acc: Int, cur: Int -> if (cur > limit) acc + power else acc + cur;
      };
      
      
      return total;
  }
  
  private fun getDivisorCount(value: Int): Int {
      var result: MutableSet<Int> = mutableSetOf()
      
      if (value === 0) {
          return 0;
      }
      
      var maximumValue = Math.ceil(Math.sqrt(value.toDouble())).toInt();
      
      for (i in 1..maximumValue) {
          var quotient = value / i;
          var remainder = value % i;
          
         if (remainder === 0) {
             result.add(i)
             result.add(quotient);
         }
      }
      
      return result.size;
  } 
}