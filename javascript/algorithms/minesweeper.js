const directions = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const check = (nx, ny, rowLength, colLength, now) =>
  nx >= 0 && ny >= 0 && nx < rowLength && ny < colLength;

const dfs = (board, x, y) => {
  if (board[x][y] !== "E") return;
  let cnt = 0;
  const nextArr = [];
  const rowLength = board.length;
  const colLength = board[0].length;
  for (let i = 0; i < 8; i += 1) {
    const [dx, dy] = directions[i];
    const nx = x + dx;
    const ny = y + dy;
    if (check(nx, ny, rowLength, colLength)) {
      if (board[nx][ny] === "M") cnt += 1;
      if (board[nx][ny] === "E") nextArr.push([nx, ny]);
    }
  }
  if (cnt) {
    board[x][y] = `${cnt}`;
  } else {
    board[x][y] = "B";
    for (const [nx, ny] of nextArr) {
      dfs(board, nx, ny);
    }
  }
};

const updateBoard = (board, click) => {
  const now = board[click[0]][click[1]];
  if (now === "M") board[click[0]][click[1]] = "X";
  dfs(board, click[0], click[1]);
  return board;
};
