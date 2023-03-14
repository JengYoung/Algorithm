class Queue {
  constructor(base = null) {
    this.arr = base ?? [];
    this.front = 0;
    this.rear = base?.length ?? 0;
  }

  enqueue(data) {
    this.arr.push(data);
    this.rear += 1;

    return this.length;
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

  get head() {
    return this.arr[this.front];
  }
}

const solution = (n, m, section) => {
  let cnt = 0;

  const queue = new Queue(section);

  while (queue.length) {
    cnt += 1;
    const now = queue.dequeue();

    const end = now + m - 1;

    while (queue.length && queue.head <= end) {
      queue.dequeue();
    }
  }

  return cnt;
};

console.log(solution(8, 4, [2, 3, 6]));
