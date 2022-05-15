const longestConsecutive = function (nums) {
  const minusIntegers = {};
  const plusIntegers = {};

  for (let i = 0; i < nums.length; i += 1) {
    const now = nums[i];

    if (now < 0) {
      minusIntegers[Math.abs(now)] = 0;
    } else {
      plusIntegers[now] = 0;
    }
  }

  const minusArr = Object.keys(minusIntegers);
  const plusArr = Object.keys(plusIntegers);

  let last;
  let nowCount = 0;
  let maxCount = 0;

  const check = (prev, now) => !!(parseInt(prev) === parseInt(now - 1));
  const updateValue = (now) => {
    if (last === undefined) {
      last = now;
      nowCount = 1;

      return;
    }

    if (!check(last, now)) {
      maxCount = Math.max(nowCount, maxCount);
      nowCount = 1;
    } else {
      nowCount += 1;
    }

    last = now;
  };

  while (minusArr.length) {
    const now = -1 * minusArr.pop();

    updateValue(now);
  }

  for (let i = 0; i < plusArr.length; i += 1) {
    const now = plusArr[i];

    updateValue(now);
  }

  return Math.max(maxCount, nowCount);
};

(() => {
  const nums = [100, 4, 200, 1, 3, 2];
  console.log(longestConsecutive(nums)); // 4
})();

(() => {
  const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
  console.log(longestConsecutive(nums)); // 4
})();

(() => {
  const nums = [0, -1];
  console.log(longestConsecutive(nums)); // 4
})();

(() => {
  const nums = [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6];
  console.log(longestConsecutive(nums)); // 4
})();

(() => {
  const nums = [
    4, 0, -4, -2, 2, 5, 2, 0, -8, -8, -8, -8, -1, 7, 4, 5, 5, -4, 6, 6, -3,
  ];
  console.log(longestConsecutive(nums));
})();

(() => {
  const nums = [-7, -1, 3, -9, -4, 7, -3, 2, 4, 9, 4, -9, 8, -7, 5, -1, -7];
  console.log(longestConsecutive(nums));
})();
