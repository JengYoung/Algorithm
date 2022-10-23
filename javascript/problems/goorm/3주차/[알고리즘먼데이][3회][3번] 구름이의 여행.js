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
    if (!this.length) return;
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
  const visited = new Array(5001).fill(false);

  const [baseInfo, ...graphInfos] = arr;

  /* eslint-disable-next-line */
  const [n, m, k] = baseInfo.split(' ');

  const queue = new Queue();

  const graph = {};

  graphInfos.forEach((val) => {
    const [from, to] = val.split(' ');

    graph[from] = graph[from] ? [...graph[from], to] : [to];
    graph[to] = graph[to] ? [...graph[to], from] : [from];
  });

  visited[1] = true;

  graph[1].forEach((to) => {
    queue.enqueue([1, to]);
  });

  let flag = false;

  while (queue.length) {
    const [cnt, to] = queue.dequeue();
    if (cnt > k || visited[to]) continue;

    if (to === n) {
      flag = true;
      break;
    }

    visited[to] = true;
    graph[to].forEach((next) => queue.enqueue([cnt + 1, next]));
  }

  console.log(flag ? 'YES' : 'NO');
}
