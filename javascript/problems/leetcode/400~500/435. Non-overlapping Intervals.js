/**
 * @param {number[][]} intervals
 * @return {number}
 */
const getSortedArray = (arr, func) => {
  return [...arr].sort(func);
};
const eraseOverlapIntervals = (intervals) => {
  let answer = 0;

  const sortedIntervals = getSortedArray(intervals, (a, b) => a[1] - b[1]);
  let last = -50000;

  sortedIntervals.forEach(([from, to]) => {
    if (from < last) {
      answer += 1;
    } else {
      last = to;
    }
  });

  return answer;
};

(() => {
  const intervals = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ];
  console.log(eraseOverlapIntervals(intervals));
})();

(() => {
  const intervals = [
    [1, 100],
    [11, 22],
    [1, 11],
    [2, 12],
  ];
  console.log(eraseOverlapIntervals(intervals));
})();
