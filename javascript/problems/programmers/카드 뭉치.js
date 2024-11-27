class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;

    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    const removeNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size -= 1;

    return removeNode.data;
  }

  isEmpty() {
    return this.size === 0;
  }

  get front() {
    if (!this.head) {
      return null;
    }

    return this.head.data;
  }

  get rear() {
    if (!this.tail) {
      return null;
    }

    return this.tail.data;
  }
}

/**
 * 1. 각 매개변수를 데이터로 갖는 큐 3개를 만든다.
 * 2. goal에 관한 단어를 pop할 때마다 cards1, cards2에 있는지 확인한다.
 * 3. 없으면 false, 있다면 계속해서 빼낸다.
 * 4. 모두 빼냈다면 true, 아니라면 false를 반환한다.
 */
function solution(cards1, cards2, goal) {
  const first = new Queue();
  const second = new Queue();

  const needs = new Queue();

  cards1.forEach((card) => first.push(card));
  cards2.forEach((card) => second.push(card));
  goal.forEach((word) => needs.push(word));

  while (needs.size) {
    const now = needs.pop();

    if (first.front === now) {
      first.pop();
      continue;
    }

    if (second.front === now) {
      second.pop();
      continue;
    }

    return 'No';
  }

  return 'Yes';
}
