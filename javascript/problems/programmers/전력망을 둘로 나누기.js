const n = 9;
const wires = [
  [1, 3],
  [2, 3],
  [3, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [7, 8],
  [7, 9],
];

class Queue {
  constructor(val) {
    this.queue = val ? [val] : [];
    this.front = 0;
    this.rear = this.queue.length;
  }
  enqueue(...args) {
    this.queue.push(...args);
    this.rear += args.length;
  }
  dequeue() {
    const value = this.queue[this.front];
    this.front += 1;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
}

const makeGraph = (wires) => {
  const graph = {};

  wires.forEach(([from, to]) => {
    graph[from] = graph[from] ? [...graph[from], to] : [to];
    graph[to] = graph[to] ? [...graph[to], from] : [from];
  });

  return graph;
};

const solution = (n, wires) => {
  let minValue = Infinity;
  const start = wires[0][0];
  const visited = new Array(n).fill(false);

  const graph = makeGraph(wires);

  wires.forEach(([from, to]) => {
    const nowGraph = { ...graph };
    nowGraph[to] = nowGraph[to].filter((val) => val !== from);
    nowGraph[from] = nowGraph[from].filter((val) => val !== to);
    const queue = new Queue(start);
    const nowVisited = [...visited];
    while (queue.size()) {
      const now = queue.dequeue();
      nowGraph[now].forEach((next) => {
        if (!nowVisited[next]) {
          queue.enqueue(next);
          nowVisited[next] = true;
        }
      });
    }
    const nowValue = nowVisited.filter((bool) => bool).length;
    minValue = Math.min(minValue, Math.abs(n - nowValue * 2));
  });

  return minValue;
};

console.log(solution(n, wires));
