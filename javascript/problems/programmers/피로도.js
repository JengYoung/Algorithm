// 3:17
const solution = (k, dungeons) => {
  let maxCount = 0;
  const dungeonsCount = dungeons.length;
  const queue = [];

  for (let i = 0; i < dungeonsCount; i += 1) {
    const [minFatigue, fatigueCost] = dungeons[i];

    if (k >= minFatigue) {
      queue.push([k - fatigueCost, 1, [i]]);
    }
  }

  while (queue.length) {
    if (maxCount === dungeonsCount) return maxCount;

    const [nowFatigue, nowCount, visited] = queue.shift();
    if (visited.length === dungeonsCount) {
      if (maxCount < nowCount) {
        maxCount = nowCount;
      }

      continue;
    }

    for (let i = 0; i < dungeonsCount; i += 1) {
      if (visited.includes(i)) continue;

      const [minFatigue, fatigueCost] = dungeons[i];

      if (nowFatigue >= minFatigue) {
        queue.push([nowFatigue - fatigueCost, nowCount + 1, [...visited, i]]);
      } else {
        queue.push([nowFatigue, nowCount, [...visited, i]]);
      }
    }
  }
  return maxCount;
};

(() => {
  const k = 80;
  const dungeons = [
    [80, 20],
    [50, 40],
    [30, 10],
  ];

  console.log(solution(k, dungeons));
})();
