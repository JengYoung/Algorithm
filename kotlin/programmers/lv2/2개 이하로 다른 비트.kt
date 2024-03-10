class Solution {
  fun solution(numbers: LongArray): LongArray {
      return numbers.map { findMinimumLowerThan2Bit(it) }.toLongArray();
  }
  
  fun findMinimumLowerThan2Bit(num: Long): Long {
      val bit = num.toString(2);
      val last0Index = bit.lastIndexOf('0');
      
      if (last0Index == bit.lastIndex) {
          return num + 1;
      }
      
      if (last0Index < 0) {
          return num + (1L shl bit.length) / 2;
      }        
      
      val plusValue = 1L shl (bit.lastIndex - last0Index - 1);

      return num + (if (plusValue > 0) plusValue else 0);
  }
}