/**
 * 전형적인 슬라이딩 윈도우 문제.
 * 
 * 1. Map을 생성한다.
 * 2. 처음 10개에 대한 내역을 Map에 업데이트한다.
 * 3. 반복문을 통해 현재 인덱스 값의 이전 값은 빼고, index + 10의 값은 카운트 값에 더한다.
 * 4. 일치하는 카운트 개수를 반환한다.
 */

 class ShoppingList(name: Array<String>, count: IntArray) {
  val map: MutableMap<String, Int> = mutableMapOf();
  
  init {
    name.forEachIndexed { index, value ->
      map.set(value, -1 * count[index])
    }
  }
  
  fun substract(name: String) {
      map.set(name, (map.get(name) ?: 0) - 1);
  }
  
  fun add(name: String) {
      map.set(name, (map.get(name) ?: 0) + 1);
  }
  
  fun show(): MutableMap<String, Int> {
      return map;
  }
}

class Shopping(shoppingList: ShoppingList, discount: Array<String>) {
    val RANGE_SIZE = 10;
    val LAST_DAY_INDEX = discount.size - RANGE_SIZE + 1;
    
    var count = 0;
    
    var shoppingList = shoppingList;
    var discount = discount;
    
    fun run(): Int {
        for (index in 0 until LAST_DAY_INDEX) {
            refresh(index);
            
            if (isShoppingDay()) {
                count += 1;
            }
        }
        
        return count;
    }
    
    private fun refresh(firstDay: Int) {
        val isInitialized = firstDay == 0;
        
        if (isInitialized) {
            initialize();
            return;
        }
        
        updateShoppingList(firstDay);
    }
    
    private fun initialize() {
        for (index in 0 until RANGE_SIZE) {
            shoppingList.add(discount[index]);
        }
    }
    
    private fun updateShoppingList(now: Int) {
        val yesterDayProduct = discount[now - 1];
        val endDayProduct = discount[now + RANGE_SIZE - 1];        

        shoppingList.add(endDayProduct);
        shoppingList.substract(yesterDayProduct);
    }
    
    private fun isShoppingDay(): Boolean {
        val now = shoppingList.show();
        
        var remains: Map<String, Int> = now.filter { (key, value) ->
            value != 0;
        }
        
        return remains.size == 0
    }
}

class Solution {
  fun solution(want: Array<String>, number: IntArray, discount: Array<String>): Int {
    val shoppingList = ShoppingList(want, number);

    val shopping = Shopping(shoppingList, discount);
      
    return shopping.run();
  }
}