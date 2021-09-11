/*
    구현 방법 -  array, front, rear을 통한 큐 구현
*/ 
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
const queue = new Queue();
for (let i = 0; i < 1000000; i += 1) {
  queue.enqueue(1);
}

console.time()
while(queue.size()) {
  const a = queue.dequeue();
}
console.timeEnd()

const test = new Array(100000).fill(1);
console.time()
while(test.length) {
  const a = test.shift()
}
console.timeEnd();
