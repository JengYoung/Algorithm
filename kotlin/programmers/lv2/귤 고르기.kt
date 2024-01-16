import java.util.* 

class Solution {
  fun solution(k: Int, tangerine: IntArray): Int {
      var answer: Int = 0
      var remainCount = k;
      
      var maxHeap = PriorityQueue<Pair<String, Int>>(compareByDescending { it.second });
      var tangerineCounts = createTangerineCounts(tangerine);
      
      tangerineCounts.forEach { entry -> 
          maxHeap.add(Pair(entry.key, entry.value))
      }
      
      while(maxHeap.isNotEmpty() && remainCount > 0) {
          remainCount -= maxHeap.poll().second;
          answer += 1;
      }
      
      return answer
  }
  
  private fun createTangerineCounts(tangerine: IntArray): MutableMap<String, Int> {
      var tangerineMap = mutableMapOf<String, Int>();
      
      tangerine.forEach { v -> 
        var size = v.toString();
          
        if (tangerineMap.containsKey(size)) {
            tangerineMap[size] = (tangerineMap[size] ?: 0) + 1;
            return@forEach;
        }
        
        tangerineMap[size] = 1;
      };
      
      return tangerineMap
  }
}