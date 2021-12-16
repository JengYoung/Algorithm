/**
 * @param {number[]} nums
 * @return {number}
 */

function combinations(arr, num) {
  const resArr = [];
  if (num === 1) return arr.map((val) => [val]);
  arr.forEach((now, nowIdx) => {
    const restArr = arr.filter((each, eachIdx) => nowIdx < eachIdx);
    const cArr = combinations(restArr, num - 1);
    const result = cArr.map((c) => [now, ...c]);
    resArr.push(...result);
  });

  return resArr;
}

var subsetXORSum = function (nums) {
  let res = 0;
  for (let i = 1; i <= nums.length; i += 1) {
    const nowResult = combinations(nums, i);
    nowResult.forEach((nowArr) => {
      let total = 0;
      nowArr.forEach((val) => {
        total = total ^ val;
      });
      res += total;
    });
  }
  return res;
};
