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
 * @return {number}
 */

/* eslint-disable */
var goodNodes = function (root) {
  let cnt = 0;

  const dfs = (node, maxValue) => {
    if (!node) return;

    const currMaxValue = Math.max(maxValue, node.val);
    if (node.val === currMaxValue) cnt += 1;

    if (node.left) dfs(node.left, currMaxValue);
    if (node.right) dfs(node.right, currMaxValue);
  };

  dfs(root, -10001);

  return cnt;
};
