class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  peek() {
    return this.queue[this.front];
  }
  size() {
    return this.rear - this.front;
  }
}

const check = (nextX, nextY, mapXLength, mapYLength, maps) => {
  return (
    nextX >= 0 &&
    nextY >= 0 &&
    nextX < mapXLength &&
    nextY < mapYLength &&
    maps[nextX][nextY]
  );
};

const solution = (maps) => {
  let answer = 0;

  const mapXLength = maps.length;
  const mapYLength = maps[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const queue = new Queue();
  queue.enqueue([0, 0]); // 큐에 넣어진 것들 각각마다 visited 체크 여부가 달라지지 않을까...?

  while (queue.size()) {
    answer += 1;
    const queueSize = queue.size();
    for (let i = 0; i < queueSize; i += 1) {
      const [nowX, nowY] = queue.dequeue();
      if (!maps[nowX][nowY]) {
        continue;
      }
      maps[nowX][nowY] = false;
      if (nowX === mapXLength - 1 && nowY === mapYLength - 1) {
        return answer;
      }

      directions.forEach(([dx, dy]) => {
        const nextX = nowX + dx;
        const nextY = nowY + dy;
        if (check(nextX, nextY, mapXLength, mapYLength, maps)) {
          queue.enqueue([nextX, nextY]);
        }
      });
    }
  }
  return -1;
};

const maps = [
  [1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
];

console.log(solution(maps));
