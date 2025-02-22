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
const pathSum = function (root, targetSum) {
  const result = [];

  const dfs = (node, before, beforeTotal) => {
    const isLeaf = !node?.left && !node?.right;

    if (!node) {
      return;
    }

    const total = beforeTotal + node.val;
    const now = before.concat(node.val);

    if (total === targetSum && isLeaf) {
      result.push(now);
    }

    dfs(node?.left, [...now], total);
    dfs(node?.right, [...now], total);
  };

  dfs(root, [], 0);

  return result;
};
