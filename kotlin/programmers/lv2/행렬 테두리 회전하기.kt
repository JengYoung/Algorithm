class Solution {
  fun solution(rows: Int, columns: Int, queries: Array<IntArray>): IntArray {
      var answer: MutableList<Int> = mutableListOf<Int>();
      
      val matrix = Array(rows + 1) { i -> 
          IntArray(columns + 1) { j -> 
              if (i == 0 || j == 0) 0 else (i - 1) * columns + j;
          } 
      };
      
      for (query in queries) {
          val row1 = query[0];
          val col1 = query[1];
          val row2 = query[2];
          val col2 = query[3];
          
          val topLeft = Pair(row1, col1);
          val topRight = Pair(row1, col2);
          val bottomLeft = Pair(row2, col1);
          val bottomRight = Pair(row2, col2);
          
          var temp: Int = matrix[topLeft.first][topLeft.second];
          var minValue: Int = temp;
          
          // 왼쪽 위 -> 오른쪽 위            
          for (i in topLeft.second..topRight.second - 1) {  
              val nextTemp = matrix[topLeft.first][i + 1];
              matrix[topLeft.first][i + 1] = temp;
              temp = nextTemp;
              
              if (minValue > temp) {
                  minValue = temp;
              }
          }
          
          // 오른쪽 위 -> 아래
          for (i in topRight.first..bottomRight.first - 1) {
              val nextTemp = matrix[i + 1][topRight.second];
              matrix[i + 1][topRight.second] = temp;
              temp = nextTemp;
              
              if (minValue > temp) {
                  minValue = temp;
              }
          }
          
          // 오른쪽 아래 -> 왼쪽 아래
          for (i in bottomRight.second downTo bottomLeft.second + 1) {
              val nextTemp = matrix[bottomRight.first][i - 1];
              matrix[bottomRight.first][i - 1] = temp;
              temp = nextTemp;
              
              if (minValue > temp) {
                  minValue = temp;
              }
          }
      
          // 왼쪽 아래 -> 왼쪽 위
          for (i in bottomLeft.first downTo topLeft.first + 1 ) {
              val nextTemp = matrix[i - 1][bottomLeft.second];
              matrix[i - 1][bottomLeft.second] = temp;
              temp = nextTemp;
              
              if (minValue > temp) {
                  minValue = temp;
              }
          }
          
          answer.add(minValue);
      }
      
      return answer.toIntArray();
  }
}