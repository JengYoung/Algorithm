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

function solution(numbers, target) {
  let answer = 0;

  const queue = new Queue();
  queue.enqueue([0, numbers]);

  while (queue.size()) {
    const [nowSum, nowArr] = queue.dequeue();
    if (!nowArr.length) {
      if (nowSum === target) {
        answer += 1;
      }
      continue;
    }
    const nextArr = [...nowArr];
    const nowShifted = nextArr.shift();
    queue.enqueue([nowSum + nowShifted, nextArr]);
    queue.enqueue([nowSum - nowShifted, nextArr]);
  }

  return answer;
}

const numbers = [1, 1, 1, 1, 1];
const target = 3;
console.log(solution(numbers, target));
