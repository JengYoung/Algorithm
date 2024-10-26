/**
 * 결국 핵심은 다수 요소라는 조건이다.
 * 1. 다수요소는 항상 카운트가 남들보다 높다. 따라서 현재 후보를 업데이트하는 변수를 만든다.
 * 2. 특정 수가 만약 카운트가 다른 것을 제하더라도 1보다 많은지를 체크하는 함수를 만든다.
 * 3. 결과를 반환한다.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  // 2. 특정 수가 만약 카운트가 다른 것을 제하더라도 1보다 많은지를 체크하는 함수를 만든다.
  const updateCandidate = (candidates) => {
    // 1. 다수요소는 항상 카운트가 남들보다 높다. 따라서 현재 후보를 업데이트하는 변수를 만든다.
    let result = null;

    // 이 result가 적합한 후보인지를 판단하는 상태
    let count = 0;

    candidates.forEach((candidate) => {
      if (result === null) {
        result = candidate;
        count += 1;
        return;
      }

      if (result === candidate) {
        count += 1;
        return;
      }

      count -= 1;

      if (count === 0) {
        result = null;
      }
    });

    return result;
  };

  // 3. 결과를 반환한다.
  return updateCandidate(nums);
};
