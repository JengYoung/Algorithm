class Q {
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
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  const result = [];

  const queue = new Q();

  queue.enqueue(root);

  while (queue.size) {
    const size = queue.size;

    for (let i = 0; i < size; i += 1) {
      const node = queue.dequeue();

      if (!node) continue;

      if (i === size - 1) {
        result.push(node.val);
      }

      if (node.left) {
        queue.enqueue(node.left);
      }

      if (node.right) {
        queue.enqueue(node.right);
      }
    }
  }

  return result;
};
