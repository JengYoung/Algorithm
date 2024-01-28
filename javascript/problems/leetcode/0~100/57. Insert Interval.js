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

    if (start < mergedInterval[0]) {
      mergedInterval[0] = start;
    }

    if (end > mergedInterval[1]) {
      mergedInterval[1] = end;
    }
  });

  if (!inserted) {
    res.push(mergedInterval);
  }

  return res;
};
