const solution = (n) => {
  const answer = [];
  const arr = Array.from({ length: n }, () => new Array(n).fill(0));

  const directions = [
    [1, 0],
    [0, 1],
    [-1, -1],
  ];
  let row = -1;
  let col = 0;

  let now = 1;
  let nowCnt = 0;

  for (let i = n; i > 0; i -= 1) {
    const [dRow, dCol] = directions[nowCnt];

    for (let j = 0; j < i; j += 1) {
      row += dRow;
      col += dCol;

      arr[row][col] = now;

      now += 1;
    }

    nowCnt = (nowCnt + 1) % 3;
  }

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (arr[i][j]) answer.push(arr[i][j]);
    }
  }
  return answer;
};

console.log(solution(6));
