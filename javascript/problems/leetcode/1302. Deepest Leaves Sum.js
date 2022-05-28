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
var deepestLeavesSum = function (root) {
  let leaves = {};

  const dfs = (node, depth) => {
    if (node.left === null && node.right === null) {
      leaves[depth] = (leaves[depth] ?? []).concat([node.val]);
    }

    if (node.left !== null) dfs(node.left, depth + 1);
    if (node.right !== null) dfs(node.right, depth + 1);
  };

  dfs(root, 0);

  return leaves[Object.keys(leaves).pop()].reduce((acc, cur) => acc + cur);
};
