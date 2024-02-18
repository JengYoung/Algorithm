class CustomQueue {
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  const result = [];
  const queue = new CustomQueue();

  queue.enqueue([root, 0]);

  while (queue.size) {
    const [now, depth] = queue.dequeue();

    if (now.left) {
      queue.enqueue([now.left, depth + 1]);
    }

    if (now.right) {
      queue.enqueue([now.right, depth + 1]);
    }

    result[depth] = [...(result[depth] ?? []), now.val];
  }

  return result;
};
