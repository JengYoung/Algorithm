// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim())).on('close', () => {
    main(inputs);
    process.exit();
  });
})();

class Queue {
  constructor() {
    this.arr = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.arr.push(value);
    this.rear += 1;
  }

  dequeue() {
    const value = this.arr[this.front];

    delete this.arr[this.front];
    this.front += 1;

    return value;
  }

  get length() {
    return this.rear - this.front;
  }
}

function main(arr) {
  const [n, ...graphInfos] = arr;

  const pushNotCycle = (queue, graph) => {
    for (let i = 1; i < graph.length; i += 1) {
      if (graph[i].length === 1) {
        queue.enqueue(i);
      }
    }
  };

  const graph = Array.from({ length: +n + 1 }, () => []);

  const queue = new Queue();

  graphInfos.forEach((e) => {
    const eArr = e.split(' ');

    const from = +eArr[0];
    const to = +eArr[1];

    graph[from].push(to);
    graph[to].push(from);
  });

  pushNotCycle(queue, graph);

  while (queue.length) {
    const now = queue.dequeue();

    const next = graph[now][0];
    if (next === undefined) continue;

    graph[now] = [];
    graph[next] = graph[next].filter((v) => v !== now);

    pushNotCycle(queue, graph);
  }

  const cycle = [];

  for (let i = 1; i < graph.length; i += 1) {
    if (graph[i].length) {
      cycle.push(i);
    }
  }

  console.log(cycle.length);
  console.log(cycle.join(' '));
}
