/**
 * 정말 대표격이라 할 수 있는 전형적인 DP 문제이다.
 * 1. 얼핏 보면 그리디 알고리즘 같지만, 결국 메모이제이션을 통해 이전 값들을 캐싱하면서 문제를 해결해야 한다.
 * 2. dp 배열을 생성한다. dp[N]에서 N번째 인덱스는 N번째 집까지의 강도가 털 수 있는 최대 액수라 보면 된다.
 * 3. 이후, dp를 초기화해야 한다. 0번째 인덱스는 계산할 게 없으니 nums[0]을, 1번째 인덱스는 nums[0]과 nums[1]을 비교하여, 최댓값을 할당한다.
 * 4. 점화식을 세워야 하는데 간단하다. 인접하지만 않으면 되니 2번째 이전과 현재를 더한게 직전의 최댓값보다 작은지만 검사하고, 최댓값을 업데이트하면 된다.
 * 5. 결과를 반환한다.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const houseCount = nums.length;

  if (houseCount === 1) {
    return nums[0];
  }

  const dp = new Array(houseCount).fill(0);

  dp[0] = nums[0];
  dp[1] = Math.max(dp[0], nums[1]);

  for (let i = 2; i < houseCount; i += 1) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp.at(-1);
};
