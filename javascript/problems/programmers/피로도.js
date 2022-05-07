class Queue {
  constructor() {
    this.arr = [];
    this.front = 0;
    this.rear = 0;
    this.length = 0;
  }

  push(val) {
    this.arr.push(val);
    this.rear += 1;
    this.length += 1;
  }

  shift() {
    if (this.length) {
      const value = this.arr[this.front];
      delete this.arr[this.front];
      this.front += 1;
      this.length -= 1;
      return value;
    }
  }
}

const solution = (k, dungeons) => {
  let maxCount = 0;
  const dungeonsCount = dungeons.length;
  const queue = new Queue();
  const makeVisited = (count) => new Array(count).fill(false);

  for (let i = 0; i < dungeonsCount; i += 1) {
    const [minFatigue, fatigueCost] = dungeons[i];

    if (k >= minFatigue) {
      const visited = makeVisited(dungeonsCount);
      visited[i] = true;

      queue.push([k - fatigueCost, 1, visited]);
    }
  }

  while (queue.length) {
    if (maxCount === dungeonsCount) return maxCount;

    const [nowFatigue, nowCount, visited] = queue.shift();

    if (visited.every((v) => v)) {
      if (maxCount < nowCount) maxCount = nowCount;
      continue;
    }

    for (let i = 0; i < dungeonsCount; i += 1) {
      if (visited[i]) continue;

      const [minFatigue, fatigueCost] = dungeons[i];
      const nextVisited = visited.map((value, idx) => idx === i || value);

      queue.push(
        nowFatigue >= minFatigue
          ? [nowFatigue - fatigueCost, nowCount + 1, nextVisited]
          : [nowFatigue, nowCount, nextVisited]
      );
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
