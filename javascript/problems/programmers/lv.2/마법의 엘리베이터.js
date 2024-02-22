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

function solution(storey) {
  let answer = Infinity;

  const queue = new Queue();

  queue.enqueue([storey, 0]);

  while (queue.size()) {
    const [now, count] = queue.dequeue();
    console.log({ now, count, answer });

    if (now === 0) {
      answer = Math.min(answer, count);
      continue;
    }

    const remainder = now % 10;
    const quotient = ~~(now / 10);
    const minusValue = 10 - remainder;

    if (quotient === 0) {
      answer = Math.min(answer, count + remainder, count + minusValue + 1);
      continue;
    }

    if (remainder > 5) {
      queue.enqueue([quotient + 1, count + minusValue]);
    }

    if (remainder < 5) {
      queue.enqueue([quotient, count + remainder]);
    }

    if (remainder === 5) {
      queue.enqueue([quotient + 1, count + 5]);
      queue.enqueue([quotient, count + remainder]);
    }
  }

  return answer;
}
