import java.util.ArrayDeque;

class BracketChecker {    
    fun check(s: String): Boolean {
        while (s.length != 0) {
            val nextString = s
                .replace("{}", "")
                .replace("()", "")
                .replace("[]", "");
            
            if (s.length == nextString.length) {
                return false;
            }
            
            return check(nextString);
        }
        
        return true;
    }
}

class Solution {
    fun solution(s: String): Int {
        if (s.length % 2 != 0) {
            return 0;
        }
        
        var answer: Int = 0;
        
        val checker = BracketChecker();
        val deque = ArrayDeque<String>();
        
        s.forEach { deque.addLast(it.toString()) };
        
        for (char in s) {
            var string: String = "";
            
            deque.forEach { string += it };
            
            if (checker.check(string)) {
                answer += 1;
            }
            
            val first = deque.remove();
            deque.addLast(first);
        }
        
        return answer;
    }
}