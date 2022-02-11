class Queue {
  constructor(info) {
    this.info = info;

    this.arr = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(val) {
    this.arr[this.rear] = val;
    this.rear += 1;
  }

  dequeue() {
    const value = this.arr[this.front];
    delete this.arr[this.front];
    this.front += 1;
    return value;
  }

  size() {
    return this.rear - this.front;
  }

  sort() {
    this.arr.sort((a, b) => this.info[a[0]] - this.info[b[0]]); // sheep -> priority
    return this.arr;
  }
}

const solution = (info, edges) => {
  const graph = {};

  for (let [from, to] of edges) {
    if (!graph[from]) graph[from] = [];
    graph[from].push(to);
  }

  const queue = new Queue(info);
  const visited = Array(info.length).fill(false);
  let maxSheep = 0;

  queue.enqueue([0, 0, 0, [...(graph[0] || [])], [...visited]]); // now, nowSheep, nowWolves, possibleVisit

  while (queue.size()) {
    const [now, nowSheep, nowWolves, possibleVisit, nowVisited] =
      queue.dequeue();
    nowVisited[now] = true;

    const nextSheep = nowSheep + !info[now];
    const nextWolves = nowWolves + info[now];
    if (nextSheep <= nextWolves) continue;

    maxSheep = Math.max(maxSheep, nextSheep);

    possibleVisit.push(...(graph[now] || []));
    for (let next of possibleVisit) {
      if (nowVisited[next]) continue;

      queue.enqueue([
        next,
        nextSheep,
        nextWolves,
        possibleVisit.filter((v) => v !== next),
        [...nowVisited],
      ]);
    }
  }

  return maxSheep;
};

(() => {
  const info = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1];
  const edges = [
    [0, 1],
    [1, 2],
    [1, 4],
    [0, 8],
    [8, 7],
    [9, 10],
    [9, 11],
    [4, 3],
    [6, 5],
    [4, 6],
    [8, 9],
  ];

  console.log(solution(info, edges));
})();
