const MODULAR_ARITHMETIC_DIVIDE_NUMBER = 1000000007;

function before(n, count) {
  const arr = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  arr[1][1] = 1;

  for (let row = 2; row < n + 1; row += 1) {
    const prevRow = row - 1;
    for (let col = 1; col <= row; col += 1) {
      arr[row][col] =
        (arr[prevRow][col - 1] + 2 * prevRow * arr[prevRow][col]) %
        MODULAR_ARITHMETIC_DIVIDE_NUMBER;
    }
  }
  return arr[n][count];
}

const beforeStart = +new Date();
before(10000, 1);
const beforeEnd = +new Date();
console.log(beforeEnd - beforeStart);

function after(n, count) {
  const arr = Array.from({ length: n + 1 }, () => new Array(count + 1).fill(0));
  arr[1][1] = 1;

  for (let row = 2; row < n + 1; row += 1) {
    const prevRow = row - 1;
    const nextColLength = Math.min(count, row);

    for (let col = 1; col <= nextColLength; col += 1) {
      arr[row][col] =
        (arr[prevRow][col - 1] + 2 * prevRow * arr[prevRow][col]) %
        MODULAR_ARITHMETIC_DIVIDE_NUMBER;
    }
  }
  return arr[n][count];
}

const afterStart = +new Date();
after(10000, 1);
const afterEnd = +new Date();
console.log(afterEnd - afterStart);

console.log((beforeEnd - beforeStart) / (afterEnd - afterStart));
