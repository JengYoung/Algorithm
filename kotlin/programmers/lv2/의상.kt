class Solution {
  fun solution(clothes: Array<Array<String>>): Int {
      var answer = 0

      var clothesMap = getClothesMap(clothes);

      return clothesMap.values.fold(1) { acc, cur -> acc * (cur + 1) } - 1;
  }

  fun getClothesMap(clothes: Array<Array<String>>): MutableMap<String, Int> {
    val result: MutableMap<String, Int> = mutableMapOf();
      
    clothes.forEach { v -> 
      val category = v[1];
                      
      val now = result.get(category);
        
      result.set(category,  if (now != null) now + 1 else 1);  
    }
    
    return result;
  }
}