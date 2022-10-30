// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim().split(' '))).on(
    'close',
    () => {
      main(inputs);

      process.exit();
    }
  );
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

  get head() {
    return this.queue[this.front];
  }

  get length() {
    return this.rear - this.front;
  }
}

function main(inputs) {
  const [position, ...transactions] = inputs;
  const [N, M] = position;

  let result = N;

  const queue = new Queue();

  for (let i = 0; i < M; i += 1) {
    const [command, money] = transactions[i];

    if (command === 'deposit') {
      result += money;
    } else if (command === 'pay') {
      if (result < money) continue;
      result -= money;
    } else {
      queue.push(money);
    }

    while (queue.length && queue.haed < result) {
      result -= queue.pop();
    }
  }

  console.log(result);
}
