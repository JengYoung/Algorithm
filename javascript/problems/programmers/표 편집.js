class LinkedList {
  constructor(value, n) {
    this.result = [];
    this.nowNode = null;
    this.idx = null;
    this.head = null;
    this.tail = null;
    this.lastIndex = null;

    this.initialize(value, n);
  }

  initialize(value, n) {
    this.result = new Array(n).fill("O");
    this.nowNode = this.getNewNode(value);
    this.nowNode.prev = this.nowNode;
    this.nowNode.next = this.nowNode;
    this.idx = 0;
    this.head = this.nowNode;
    this.tail = this.nowNode;
    this.lastIndex = n - 1;
  }

  append(value) {
    const newNode = this.getNewNode(value, this.tail, this.head);
    this.tail.next = newNode;
    this.tail = newNode;
    this.head.prev = newNode;
    this.lastIndex = value;
    return this;
  }

  remove() {
    const targetNode = this.nowNode;
    const { prev, next, value } = targetNode;
    prev.next = next;
    next.prev = prev;
    this.result[value] = "X";

    if (this.lastIndex === value) {
      this.lastIndex = prev.value;
      this.nowNode = prev;
    } else {
      this.nowNode = next;
    }

    return targetNode;
  }

  insert(node) {
    const { prev, next, value } = node;
    prev.next = node;
    next.prev = node;
    this.result[node.value] = "O";

    if (this.lastIndex < value) {
      this.lastIndex = value;
    }
  }

  getNewNode(value, prev = null, next = null) {
    return {
      value,
      prev,
      next,
    };
  }

  moveUp(cnt) {
    for (let i = 0; i < cnt; i += 1) {
      this.nowNode = this.nowNode.prev;
    }
  }
  moveDown(cnt) {
    for (let i = 0; i < cnt; i += 1) {
      this.nowNode = this.nowNode.next;
    }
  }
}

const solution = (n, k, cmd) => {
  const removeStore = [];
  const commandHandlers = {
    C: () => removeStore.push(list.remove()),
    U: (cnt) => list.moveUp(cnt),
    D: (cnt) => list.moveDown(cnt),
    Z: () => list.insert(removeStore.pop()),
  };

  const list = new LinkedList(0, n);
  for (let i = 1; i < n; i += 1) {
    list.append(i);
  }

  list.moveDown(k);

  cmd.forEach((command) => {
    const [nowCommand, cnt] = command.split(" ");
    commandHandlers[nowCommand](cnt);
  });

  return list.result.join("");
};
