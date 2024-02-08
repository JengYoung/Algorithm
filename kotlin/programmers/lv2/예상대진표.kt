import kotlin.math.*

class Solution {
    fun solution(n: Int, a: Int, b: Int): Int {
        var cnt = 0;
        
        var an = a;
        var bn = b;
        
        while (an != bn) {
            cnt += 1;
            
            an = ceil(an / 2.0).toInt();
            bn = ceil(bn / 2.0).toInt();
        }
        
        return cnt
    }
}