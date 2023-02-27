/**
 * @param {number[][]} points
 * @return {number}
 */
const findMinArrowShots = (points) => {
  points.sort(([a1], [b1]) => a1 - b1);
  let last = Infinity;
  let result = 0;

  points.forEach(([start, end]) => {
    if (last >= start) {
      last = Math.min(last, end);
    } else {
      result += 1;
      last = end;
    }
  });

  return result + 1;
};

{
  const points = [
    [10, 16],
    [2, 8],
    [1, 6],
    [7, 12],
  ];
  console.log(findMinArrowShots(points));
}
