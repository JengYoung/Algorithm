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
    this.queue[this.rear] = value;
    this.rear += 1;
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
  const [N, M] = inputs[0];

  let result = +N;

  const queue = new Queue();

  for (let i = 0; i < +M; i += 1) {
    const [command, money] = inputs[i + 1];
    const moneyNumber = Number(money);

    if (command === 'deposit') {
      result += moneyNumber;
    } else if (command === 'pay') {
      if (result < moneyNumber) continue;
      result -= moneyNumber;
    } else {
      queue.enqueue(moneyNumber);
    }

    while (queue.length && queue.head <= result) {
      result -= queue.dequeue();
    }
  }

  console.log(result);
}
