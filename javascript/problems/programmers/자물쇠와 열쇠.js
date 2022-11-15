/* @todo
 * 1. 순회하면서 자물쇠를 4방향으로 돌린다. (돌려서 결과를 도출하는 getRotatedKey 함수를 만들어야겠다.)
 * 2. 4방향으로 모든 것이 맞는지 체크하는 check 함수를 호출한다.
 * 3. 만약 하나라도 맞으면 바로 true를 리턴하고, 아니라면 결과적으로 false를 리턴한다.
 */

// 1.
const getRotatedKey = (arr) => {
  const rowLength = arr.length;
  const colLength = arr[0].length;

  const result = Array.from({ length: rowLength }, () =>
    new Array(colLength).fill(0)
  );

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      result[i][j] = arr[(j + 2) % 3][i];
    }
  }

  return result;
};

// 2.
const check = (arr) => {
  return arr.flat().every((v) => v === 1);
};

function solution(key, lock) {
  const rowLength = key.length;
  const colLength = key[0].length;

  for (let i = -rowLength + 1; i <= 0; i += 1) {
    for (let j = -colLength + 1; j <= 0; j += 1) {
      //
      for (let row = 0; row < rowLength; row += 1) {
        for (let col = 0; col < colLength; col += 1) {
          // deep copy
          let rotatedKey = JSON.parse(JSON.stringify(key));

          for (let k = 0; k < 4; k += 1) {
            const copiedLock = JSON.parse(JSON.stringify(lock));
            console.log(copiedLock);
            rotatedKey = getRotatedKey(rotatedKey);

            const keyRow = row + i;
            const keyCol = col + j;

            if (
              keyRow >= 0 &&
              keyCol >= 0 &&
              keyRow < rowLength &&
              keyCol < colLength
            ) {
              copiedLock[row][col] += rotatedKey[keyRow][keyCol];
            }

            console.log(i, j, row, col, copiedLock);
            if (check(copiedLock)) return true;
          }
        }
      }
    }
  }

  return false;
}

console.log(
  solution(
    [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
  )
);
