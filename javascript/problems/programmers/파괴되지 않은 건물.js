const solution = (board, skill) => {
  let answer = 0;

  const rowLength = board.length;
  const colLength = board[0].length;

  const arr = Array.from({ length: rowLength + 1 }, () =>
    new Array(colLength + 1).fill(0)
  );

  skill.forEach((s) => {
    const [type, r1, c1, r2, c2, degree] = s;

    const start = type === 1 ? -1 * degree : degree;
    const end = -1 * start;

    arr[r1][c1] += start;
    arr[r1][c2 + 1] += end;

    arr[r2 + 1][c1] += end;
    arr[r2 + 1][c2 + 1] += start;
  });

  for (let i = 0; i < rowLength; i += 1) {
    for (let j = 1; j < colLength + 1; j += 1) {
      arr[i][j] += arr[i][j - 1];
    }
  }

  for (let col = 0; col < colLength; col += 1) {
    for (let row = 1; row < rowLength + 1; row += 1) {
      arr[row][col] += arr[row - 1][col];
    }
  }

  for (let i = 0; i < rowLength; i += 1) {
    for (let j = 0; j < colLength; j += 1) {
      if (arr[i][j] + board[i][j] > 0) answer += 1;
    }
  }

  return answer;
};

(() => {
  const board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const skill = [
    [1, 1, 1, 2, 2, 4],
    [1, 0, 0, 1, 1, 2],
    [2, 2, 0, 2, 0, 100],
  ];
  console.log(solution(board, skill));
})();
