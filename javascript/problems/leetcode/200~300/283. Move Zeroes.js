/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // 임시 저장 값을 저장하는 변수를 생성한다. 이 값에는 0의 개수를 세준다.
  // 반복문을 실행한다. 이때 0을 만날 때마다 카운트를 한다.
  // 옮기는 작업을 실행한다. 0의 개수만큼 이전 인덱스에 현재의 값을 넣어줘야 한다.
  // 결과를 반환한다.

  let count = 0;

  for (let i = 0; i < nums.length; i += 1) {
    if (!nums[i]) {
      count += 1;
      continue;
    }

    if (count > 0) {
      nums[i - count] = nums[i];
      nums[i] = 0;
    }
  }

  return nums;
};
