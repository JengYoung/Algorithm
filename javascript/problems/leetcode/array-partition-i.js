const nums = [6,2,6,5,1,2];

const getResult = (nums) => {
  let cnt = 0;
  nums.forEach((num, idx) => {
    if (idx % 2 === 0) {
      cnt += Math.min(num, nums[idx + 1])
    }
  })
  return cnt;
}
const arrayPairSum = function(nums) {
  return getResult(quickSort(nums));
}
const quickSort = arr => {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr.pop();
  const pivotArr = [pivot];
  const left = [];
  const right = [];

  arr.forEach(val => {

    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      pivotArr.push(val);
    }
  })
  return quickSort(left).concat(pivotArr, quickSort(right));
}
console.log(arrayPairSum(nums))