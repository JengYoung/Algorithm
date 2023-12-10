import java.util.*;

/**
 * 1. 스택 문제이다.
 * 2. 결국 현재까지의 큰 수들을 스택으로 쌓아 올린다.
 * 3. 비교하면서 이 증가하는 수열을 업데이트한다.
 * 3-1. 만약 현재의 수가 더 크다면 기존까지의 큰 수들은 의미없으므로 모두 버린다.
 * 3-2. 만약 모두 다 비워졌다면 현재 가장 큰 수이므로 -1이다.
 * 3-3. 아니라면 스택의 맨 윗 값이 뒤에 있는 가장 큰 수 값이다.
 * 4. 현재 값이 다음 값의 가장 큰 수일 수 있으므로 배열에 다시 넣는다.
 * 5. 결과를 반환한다.
 */
class Solution {
  fun solution(numbers: IntArray): IntArray {
    var result: IntArray = IntArray(numbers.size, {0})
    
    var stack: Stack<Int> = Stack();
      
    for (index in numbers.size - 1 downTo 0) {
      val now = numbers[index];
        
      while (stack.isNotEmpty() && stack.peek() <= now) {
          stack.pop();
      }
      
      result[index] = if (stack.isEmpty()) -1 else stack.peek();
      
      stack.push(now)
    }
    
    return result;
  }
}