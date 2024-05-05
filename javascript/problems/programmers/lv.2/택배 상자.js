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
  get peek() {
    return this.queue[this.front];
  }
  get size() {
    return this.rear - this.front;
  }
}

/**
 * 메인컨테이너벨트 - 맨 앞쪽부터 빼내는 방식 = 큐
 * 보조컨테이너벨트 - 후입선출의 방식 = 스택
 */
function solution(order) {
  let result = 0;

  const mainContainerBelt = new Queue();
  const subContainerBelt = [];

  for (let i = 1; i <= order.length; i += 1) {
    mainContainerBelt.enqueue(i);
  }

  for (let now of order) {
    while (mainContainerBelt.size && mainContainerBelt.peek < now) {
      const keep = mainContainerBelt.dequeue();
      subContainerBelt.push(keep);
    }

    if (mainContainerBelt.peek === now) {
      mainContainerBelt.dequeue();

      result += 1;

      continue;
    }

    if (subContainerBelt.at(-1) === now) {
      subContainerBelt.pop();

      result += 1;

      continue;
    }

    break;
  }

  return result;
}
