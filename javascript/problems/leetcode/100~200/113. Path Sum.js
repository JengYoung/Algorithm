/*
 1. 큐에 맨 처음 루트를 넣고, 계속해서 자식 노드를 순회한다.
 2. 값을 업데이트해주면서, 다음 노드와 함께 넣는다.
 3. 만약 다음 노드가 없다면 리프이므로, 최종 값이 targetSum과 일치하는지 확인한다.
 4. 이를 큐가 다 빌 때까지 검사한다.
 5. 결과 값을 반환한다.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

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
 * @param {number} targetSum
 * @return {number[][]}
 */
class Q {
  constructor() {
    this.arr = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(val) {
    this.arr.push(val);
    this.rear += 1;
  }

  dequeue() {
    const value = this.arr[this.front];

    delete this.arr[this.front];
    this.front += 1;

    return value;
  }

  get length() {
    return this.rear - this.front;
  }
}

const nodes = ['left', 'right'];

const pathSum = (root, targetSum) => {
  const checkLeaf = (n) => !(n && nodes.some((direction) => n[direction]));

  if (checkLeaf(root)) {
    return root?.val === targetSum ? [[root?.val]] : [];
  }

  const result = [];

  const queue = new Q();
  queue.enqueue([0, [], root]);

  while (queue.length) {
    let [total, paths, now] = queue.dequeue();

    total += now.val;
    paths.push(now.val);

    if (checkLeaf(now)) {
      if (targetSum === total) {
        result.push(paths);
      }
    }

    nodes.forEach((direction) => {
      if (now[direction] !== null) {
        queue.enqueue([total, [...paths], now[direction]]);
      }
    });
  }

  return result;
};

export default pathSum;
