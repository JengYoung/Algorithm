class Solution {
  fun solution(topping: IntArray): Int {
      var answer: Int = 0;
      
      val leftMap: MutableMap<Int, Int> = mutableMapOf();
      val rightMap: MutableMap<Int, Int> = mutableMapOf();
      
      topping.forEach { v -> 
          rightMap.set(v, (rightMap.get(v) ?: 0) + 1);
      }
      
      topping.forEach { v -> 
          val nowToppingCount = rightMap.get(v) ?: 0;
          
          if (nowToppingCount == 1) {
              rightMap.remove(v);
          } else {
              rightMap.set(v, nowToppingCount - 1)
          }
          
          leftMap.set(v, (leftMap.get(v) ?: 0) + 1);
          
          if (this.isSameToppingCount(leftMap, rightMap)) {
              answer += 1;
          }
      }
      
      return answer
  }
  
  fun isSameToppingCount(leftMap: MutableMap<Int, Int>, rightMap: MutableMap<Int, Int>): Boolean {
      return leftMap.size == rightMap.size;
  }
}