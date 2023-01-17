class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.rear = null;
  }

  unshift(value) {
    const node = new Node(value);

    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      const cachedPrevFront = this.front;
      cachedPrevFront.prev = node;

      this.front = node;

      node.next = cachedPrevFront;
    }

    this.count += 1;
    return this.count;
  }

  shift() {
    if (this.count === 0) return null;

    const value = this.front.value;

    if (this.count === 1) {
      this.init();
    } else {
      this.front = this.front.next;
      this.count -= 1;
    }

    return value;
  }

  push(value) {
    const node = new Node(value);

    if (this.count === 0) {
      this.front = node;
      this.rear = node;
    } else {
      const cachedPrevRear = this.rear;
      cachedPrevRear.next = node;

      node.prev = cachedPrevRear;

      this.rear = node;
    }

    this.count += 1;

    return this.count;
  }

  pop() {
    if (this.count === 0) return;

    const value = this.rear.value;

    if (this.count === 1) {
      this.init();
    } else {
      this.rear = this.rear.prev;
      this.count -= 1;
    }

    return value;
  }

  getValue(idx) {
    if (idx >= this.count) return;
    let node = this.front;

    for (let i = 0; i < idx; i += 1) {
      node = node.next;
    }

    return node.value;
  }
}

const deque = new Deque();
deque.push(1);
deque.unshift(2);
deque.push(3);
deque.unshift(4);
deque.push(5);
//  4 2 1 3 5

console.log(deque.shift());
console.log(deque.shift());
console.log(deque.shift());
console.log(deque.shift());
console.log(deque.shift());
