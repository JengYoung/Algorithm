// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    const [N, K] = inputs[0].trim().split(' ').map(Number);
    const arr = [];

    for (let i = 1; i < inputs.length - 1; i += 1) {
      arr.push(inputs[i].trim().split(' ').map(Number));
    }

    const A = [0, ...inputs[inputs.length - 1].trim().split(' ').map(Number)];

    main(N, K, arr, A);
  });
})();

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

  get length() {
    return this.rear - this.front;
  }
}

function main(N, K, V, A) {
  let maxValue = 0;
  const graph = {};

  V.forEach(([a, b]) => {
    graph[a] = [...(graph[a] ?? []), b];
    graph[b] = [...(graph[b] ?? []), a];
  });

  const queue = new Queue();
  const initSize = A[1] <= K ? A[1] : 0;

  queue.enqueue([1, initSize, new Set([1])]);

  while (queue.length) {
    const [now, trash, visited] = queue.dequeue();

    maxValue = Math.max(trash, maxValue);

    if (maxValue === K) {
      console.log(maxValue);
      return;
    }

    if (graph[now]) {
      for (const nxt of graph[now]) {
        if (!visited.has(nxt)) {
          const nextSize = trash + A[nxt];

          if (nextSize === K) {
            console.log(trash + A[nxt]);
            return;
          }

          if (nextSize < K) {
            queue.enqueue([nxt, nextSize, new Set([...visited, nxt])]);
          }

          if (trash !== nextSize) {
            queue.enqueue([nxt, trash, new Set([...visited, nxt])]);
          }
        }
      }
    }
  }

  console.log(maxValue);
}
