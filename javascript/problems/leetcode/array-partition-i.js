const nums = [6,2,6,5,1,2];

const getResult = (nums) => {
  return nums
    .filter((_, idx) => !(idx % 2))
    .reduce((acc, cur) => acc + cur, 0);
}

const arrayPairSum = function(nums) {
  return getResult(quickSort(nums));
}

const quickSort = arr => {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr.pop(); // array에서는 pivot이 사라진 상태. [6,2,6,5,1]; 2 => left: [1], pivot: [2,2], right: [6,6,5]
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