class Quad(val x1: Int, val y1: Int, val x2: Int, val y2: Int);

class Solution {
    fun solution(arr: Array<IntArray>): IntArray {        
        val x = arr[0].size;
        val y = arr.size;
        
        val (count0, count1) = getQuadTree(arr, Quad(0, 0, x, y), Pair(0, 0));
        
        return intArrayOf(count0, count1)
    }
    
    fun getQuadTree(
        arr: Array<IntArray>, 
        quad: Quad,
        result: Pair<Int, Int>
    ): Pair<Int, Int> {     
        val x1 = quad.x1;
        val x2 = quad.x2;
        val y1 = quad.y1;
        val y2 = quad.y2;
        
        val (count0, count1) = result;
        
        if (x2 - x1 === 1) {
            val res: Int = arr[y1][x1];
            
            return Pair(
                count0 + if (res == 0) 1 else 0, 
                count1 + if (res == 1) 1 else 0
            )
        }
        
        var isNotEvery0 = false;
        var isNotEvery1 = false;
    
        for (row in y1..(y2 - 1))  {
            for (col in x1..(x2 - 1)) {
                if (arr[row][col] !== 0) {
                    isNotEvery0 = true;
                } else {
                    isNotEvery1 = true;
                }
            }
        }
        
        if (isNotEvery0 && !isNotEvery1) {        
            return Pair(count0, count1 + 1);
        }
        
        if (isNotEvery1 && !isNotEvery0) {
            return Pair(count0 + 1, count1);
        }
        
        val quad1 = Quad((x1 + x2) / 2, y1, x2, (y1 + y2) / 2);
        val quad2 = Quad(x1, y1, (x1 + x2) / 2, (y1 + y2) / 2);
        val quad3 = Quad(x1, (y1 + y2) / 2, (x1 + x2) / 2, y2);
        val quad4 = Quad((x1 + x2) / 2, (y1 + y2) / 2, x2, y2);
        
        val (count0a, count1a) = getQuadTree(arr, quad1, result);
        val (count0b, count1b) = getQuadTree(arr, quad2, result);
        val (count0c, count1c) = getQuadTree(arr, quad3, result);
        val (count0d, count1d) = getQuadTree(arr, quad4, result);
        
        return Pair(
            count0a + count0b + count0c + count0d, 
            count1a + count1b + count1c + count1d
        );
    }
}