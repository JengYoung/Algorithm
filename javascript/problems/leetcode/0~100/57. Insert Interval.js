/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  if (!intervals.length) {
    return [newInterval];
  }

  const res = [];

  const mergedInterval = [newInterval[0], newInterval[1]];
  let inserted = false;

  intervals.forEach((interval) => {
    const [start, end] = interval;

    if (end < newInterval[0] || start > newInterval[1]) {
      if (start > newInterval[1] && !inserted) {
        res.push(mergedInterval);
        inserted = true;
      }

      res.push([start, end]);
      return;
    }

    mergedInterval[0] = Math.min(mergedInterval[0], start);
    mergedInterval[1] = Math.max(mergedInterval[1], end);
  });

  if (!inserted) {
    res.push(mergedInterval);
  }

  return res;
};

console.log(insert([[1, 5]], [2, 3]));
