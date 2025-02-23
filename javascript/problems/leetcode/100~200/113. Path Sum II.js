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
    if (!node) {
      return;
    }

    before.push(node.val);

    const isLeaf = !node?.left && !node?.right;
    const total = beforeTotal + node.val;

    if (total === targetSum && isLeaf) {
      result.push([...before]);
    }

    dfs(node?.left, before, total);
    dfs(node?.right, before, total);

    before.pop();
  };

  dfs(root, [], 0);

  return result;
};
