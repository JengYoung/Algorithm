class Node {
  constructor(key, value) {
    this.prev = null;
    this.next = null;

    this.key = key;
    this.value = value;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  delete(node) {
    if (this.size === 0) {
      return;
    }

    this.size -= 1;

    if (node === this.head) {
      this.head = node.next;
      return;
    }

    if (node === this.tail) {
      this.tail = node.prev;
      return;
    }

    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  insert(node) {
    this.size += 1;

    if (this.head === null) {
      this.head = node;
      this.tail = node;

      return;
    }

    const prevHead = this.head;

    node.next = prevHead;
    prevHead.prev = node;

    this.head = node;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.list = new LinkedList();
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map.get(key);

  if (!node) {
    return -1;
  }

  this.list.delete(node);
  this.list.insert(node);

  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = new Node(key, value);
  const hasKey = this.map.has(key);

  if (hasKey) {
    this.list.delete(this.map.get(key));
    this.list.insert(node);
    this.map.set(key, node);

    return;
  }

  if (this.capacity === this.list.size) {
    const deleteTarget = this.list.tail;

    this.list.delete(deleteTarget);
    this.map.delete(deleteTarget.key);
  }

  this.list.insert(node);
  this.map.set(key, node);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
