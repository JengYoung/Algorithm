class Queue {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.queue = [];
        this.front = 0;
        this.rear = 0;
        this.size = 0;
    }
    enqueue(value) {
        if (this.isFull()) {
            console.log("Queue is full.")
            return;
        }
        this.queue[this.rear] = value;
        this.rear = (this.rear + 1) % this.maxSize;
        this.size += 1;
    }
    dequeue() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front = (this.front + 1) % this.maxSize;
        this.size -= 1;
        return value;
    }
    isFull() {
        return this.size === this.maxSize;
    }
    peek() {
        return this.queue[this.front];
    }
}

const queue = new Queue(4);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(8);
queue.enqueue(16);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.size);
console.log(queue.peek());

queue.enqueue(32);
queue.enqueue(64);
console.log(queue.isFull());