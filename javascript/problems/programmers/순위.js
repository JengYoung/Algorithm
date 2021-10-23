class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(val) {
    this.queue[this.rear] = val;
    this.rear += 1;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
}

const getDataset = (n, results) => {
  const winDataset = Array.from({ length: n }, () => new Array(n).fill(false));
  const loseDataset = Array.from({ length: n }, () => new Array(n).fill(false));
  results.forEach(([winPlayer, losePlayer]) => {
    winDataset[winPlayer - 1][losePlayer - 1] = true;
    loseDataset[losePlayer - 1][winPlayer - 1] = true;
  });
  return [winDataset, loseDataset];
};

const getVisitedByDataset = (now, dataset, visited) => {
  const queue = new Queue();
  visited[now] = true;
  bfs(dataset[now], now);
  while (queue.size()) {
    const [winner, loser] = queue.dequeue();
    bfs(dataset[loser], winner);
  }

  return visited;

  function bfs(dataset, target) {
    dataset.forEach((isNext, idx) => {
      if (isNext && !visited[idx]) {
        visited[idx] = true;
        queue.enqueue([target, idx]);
      }
    });
  }
};

const getResult = (n, winDataset, loseDataset) => {
  let result = 0;
  const makeVisited = () => Array.from({ length: n }, () => false);
  for (let now = 0; now < n; now += 1) {
    const winVisited = getVisitedByDataset(now, winDataset, makeVisited());
    const totalVisited = getVisitedByDataset(now, loseDataset, winVisited);
    result += totalVisited.every((bool) => bool);
  }
  return result;
};

const solution = (n, results) => {
  const [winDataset, loseDataset] = getDataset(n, results);
  const result = getResult(n, winDataset, loseDataset);

  return result;
};

const n = 5;
const results = [
  [1, 4],
  [4, 2],
  [2, 5],
  [5, 3],
];
console.log(solution(n, results));
