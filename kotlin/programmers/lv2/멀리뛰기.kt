class Solution {
  fun solution(n: Int): Long {
      val dp = LongArray(2001)
      
      dp.forEachIndexed { index, _ ->  
          if (index <= 2) {
              dp[index] = index.toLong()
              return@forEachIndexed
          }
          
          dp[index] = (dp[index - 1] + dp[index - 2]) % 1234567
      }
      
      return dp[n]
  }
}