const binarySearch = (n, arr, start, end) => {
  if (start > end) return start;

  const mid = Math.floor((start + end) / 2);

  const now = arr[mid];

  return now < n // 지금 수가 n보다 작으면 인덱스를 더 키워야 함.
    ? binarySearch(n, arr, mid + 1, end)
    : binarySearch(n, arr, start, mid - 1);
};

const solution = (A, B, aArr, bArr) => {
  aArr.sort((a, b) => b - a);
  bArr.sort((a, b) => a - b);

  return aArr.reduce((acc, cur) => {
    return acc + binarySearch(cur, bArr, 0, B - 1);
  }, 0);
};

(() => {
  const A = 5;
  const B = 3;
  const aArr = [8, 1, 7, 3, 1];
  const bArr = [3, 6, 1];

  console.log(solution(A, B, aArr, bArr)); // 7
})();

(() => {
  const A = 3;
  const B = 4;
  const aArr = [2, 13, 7];
  const bArr = [103, 11, 290, 215];

  console.log(solution(A, B, aArr, bArr)); // 1
})();
