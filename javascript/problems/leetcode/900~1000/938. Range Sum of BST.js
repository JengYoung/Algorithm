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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */

var rangeSumBST = function (root, low, high) {
  let sum = 0;
  const q = [];
  q.push(root);
  while (q.length) {
    const nowRoot = q.pop();
    if (!nowRoot) continue;
    if (check(nowRoot.val, low, high)) {
      sum += nowRoot.val;
    }
    if (nowRoot.left && nowRoot.left.val < low) {
      q.push(nowRoot.left.right);
    } else if (nowRoot.right && nowRoot.right.val > high) {
      q.push(nowRoot.right.left);
    } else {
      if (nowRoot.left && check(nowRoot.left.val, low, high)) {
        sum += nowRoot.left.val;
      }
      if (nowRoot.right && check(nowRoot.right.val, low, high)) {
        sum += nowRoot.right.val;
      }
    }
  }
  return sum;
};

function check(now, low, high) {
  return now >= low && now <= high;
}
