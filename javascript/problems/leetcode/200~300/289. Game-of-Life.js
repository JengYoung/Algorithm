/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

const getLifeStatus = (board, x, y) => {
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];

  let livedNeighborCnt = 0;

  for (let i = 0; i < directions.length; i += 1) {
    const [dx, dy] = directions[i];
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
      livedNeighborCnt += +board[nx][ny];
    }
  }

  return Number(
    (board[x][y] && livedNeighborCnt === 2) || livedNeighborCnt === 3
  );
};

const gameOfLife = (board) => {
  const copiedBoard = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      board[i][j] = getLifeStatus(copiedBoard, i, j);
    }
  }

  return board;
};

console.log(
  gameOfLife([
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ])
);
