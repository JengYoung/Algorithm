const getCount = (limit, times) => {
  return times.reduce((acc, cur) => acc + Math.floor(limit / cur), 0);
};

const binarySearch = (n, times, start, end) => {
  if (start > end) return start;

  const mid = Math.floor((start + end) / 2);

  const count = getCount(mid, times);

  return count >= n
    ? binarySearch(n, times, start, mid - 1)
    : binarySearch(n, times, mid + 1, end);
};

function solution(n, times) {
  let start = 0;
  let end = n * 1_000_000_000;

  return binarySearch(n, times, start, end);
}

console.log(solution(6, [7, 10]));
