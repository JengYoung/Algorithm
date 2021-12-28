class DoubleLinkedList {
  constructor(value) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.initialize(value);
  }

  initialize(value) {
    const firstNode = this.newNode(value);
    this.head = firstNode;
    this.head.prev = firstNode;
    this.head.next = firstNode;
    this.tail = head;
    this.length = 1;
  }

  append(value) {
    if (this.length === 0) {
      this.initialize(value);
      return;
    }

    const node = newNode(value, this.tail, this.head);
    this.tail.next = node;
    this.head.prev = node;
    this.tail = node;
    this.length += 1;

    return this;
  }

  prepend(value) {
    if (this.length === 0) {
      this.initialize(value);
      return;
    }

    const node = newNode(value, this.tail, this.head);
    this.head.prev = node;
    this.tail.next = node;
    this.head = node;
    this.length += 1;

    return this;
  }

  getIdxNode(idx) {
    if (idx >= this.length) {
      console.warn("invalid idx size");
      return;
    }

    let nowNode = this.head;
    for (let i = 0; i < idx; i += 1) {
      nowNode = nowNode.next;
    }

    return nowNode;
  }

  insert(idx, value) {
    const idxNode = this.getIdxNode(Math.max(idx, this.length - 1));
    const nowNode = this.newNode(value, idxNode.prev, idxNode);
    if (idx > this.length) {
      console.warn(
        "Do use append method. I think you wanna append your value. so I append your value"
      );
      this.tail = nowNode;
      this.head.prev = nowNode;
    }
    if (idx === 0) {
      console.warn("Do use prepend method.");
      this.head = nowNode;
    }

    idxNode.prev.next = nowNode;
    idxNode.prev = nowNode;

    this.length += 1;

    return this;
  }

  remove(idx) {
    if (this.length < 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    const nowNode = this.getIdxNode(idx);
    if (!nowNode) {
      return;
    }

    const { prev, next } = nowNode;
    nowNode.prev.next = next;
    nowNode.next.prev = prev;

    this.length -= 1;

    return this;
  }

  updateValue(idx, value) {
    const nowNode = this.getIdxNode(idx);
    nowNode.value = value;
  }

  newNode(value, prev = null, next = null) {
    return {
      value,
      prev,
      next,
    };
  }

  print(start = 0, end = undefined) {
    const result = [];
    let nowNode = this.getIdxNode(start);
    const printEnd = end ?? this.length;
    for (let i = start; i < printEnd; start += 1) {
      result.push(nowNode.value);
      nowNode = nowNode.next;
    }
    return result;
  }
}
