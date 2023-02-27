const makeQueenMap = (n, cols) => {
  const arr = Array.from({ length: n }, () => new Array(n).fill('.'));
  if (!cols.length) return arr;

  cols.forEach((y, x) => {
    arr[x][y] = 'Q';
  });
  return arr.map((innerArr) => innerArr.join(''));
};

const check = (cols) => {
  const arrLength = cols.length;
  if (arrLength < 2) return true;
  const nowCols = [...cols];
  const lastCol = nowCols.pop();
  return nowCols.every(
    (nowCol, idx) =>
      nowCol !== lastCol &&
      Math.abs(nowCol - lastCol) !== Math.abs(arrLength - 1 - idx)
  );
};

const backTracking = (n, cols, res) => {
  if (!check(cols)) return res;
  if (cols.length === n) return [...res, makeQueenMap(n, cols)];

  for (let i = 0; i < n; i += 1) {
    res = backTracking(n, [...cols, i], res);
  }

  return res;
};

const solveNQueens = (n) => backTracking(n, [], []);

console.log(solveNQueens(5));
