import java.util.*

class Solution {
    val OCEAN: String = "X";
    
    fun makeMap(maps: Array<String>): MutableList<MutableList<String>> {
        var res: MutableList<MutableList<String>> = mutableListOf()
        
        maps.forEachIndexed { index, row ->  
            res.add(mutableListOf())
            
            row.forEach { col ->
                res[index].add(col.toString());
            }
        }
        
        return res;
    }
    
    fun solution(maps: Array<String>): IntArray {
        var answer: MutableList<Int> = mutableListOf();
        
        var board = makeMap(maps);
        
        board.forEachIndexed { y, row ->
            row.forEachIndexed { x, now -> 
                if (now == OCEAN.toString()) {
                    return@forEachIndexed;
                }
                
                var res = bfs(board, y, x);
                answer.add(res)
                
            }
        }
        
        if (answer.size == 0) {
            answer.add(-1)
        }
        
        val comparator : Comparator<Int> = compareBy { it }
         
        answer.sortWith(comparator)
            
        return answer.toIntArray()
    }
    
    fun bfs(board: MutableList<MutableList<String>>, rowIndex: Int, colIndex: Int): Int {
        var result: Int = 0;
        val DIRECTIONS: Array<Pair<Int, Int>> = arrayOf(Pair(-1, 0), Pair(1, 0), Pair(0, 1), Pair(0, -1));
        
        val queue: Queue<Pair<Int, Int>> = LinkedList();
        
        queue.add(Pair(rowIndex, colIndex))
        
        while (queue.isNotEmpty()) {
            val now = queue.poll();            
            
            val row = now.first;
            val col = now.second;
            
            val foodString = board[row][col];
            
            if (foodString == OCEAN) {
                continue;
            }
            
            val food = foodString.toInt();
            
            result = result + food;
            
            board[row][col] = OCEAN.toString();
            
            DIRECTIONS.forEach { direction -> 
                val drow: Int = direction.first;
                val dcol: Int = direction.second;
                
                val nrow = row + drow;
                val ncol = col + dcol;
                
                if (nrow >= 0 && ncol >= 0 && nrow < board.size && ncol < board[nrow].size && board[nrow][ncol] != OCEAN) {
                    queue.add(Pair(nrow, ncol))
                }
            }
        }
        
        return result;
    }
}