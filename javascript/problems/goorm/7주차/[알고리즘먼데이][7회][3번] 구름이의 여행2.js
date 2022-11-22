// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim()));

  rl.on('close', () => {
    main(inputs);
    process.exit();
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
  get length() {
    return this.rear - this.front;
  }
}

function main(ips) {
  let result = -1;

  const [N, M, K] = ips[0].split(' ').map(Number);
  const graph = {};

  for (let i = 1; i < M + 1; i += 1) {
    const [a, b] = ips[i].split(' ').map(Number);
    graph[a] = [...(graph[a] ?? []), b];
  }

  const queue = new Queue();
  if (graph[K]) {
    for (let now of graph[K]) {
      queue.enqueue([now, 1, new Set()]);
    }
  }

  while (queue.length) {
    const [now, cnt, visited] = queue.dequeue();
    visited.add(now);

    if (now === K) {
      result = cnt;
      break;
    }

    if (graph[now]) {
      for (const v of graph[now]) {
        if (visited.has(v) === false) {
          queue.enqueue([v, cnt + 1, new Set(visited.entries())]);
        }
      }
    }
  }

  console.log(result);
}
