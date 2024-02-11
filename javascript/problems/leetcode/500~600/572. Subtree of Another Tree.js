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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  let flag = false;

  const deepCheck = (node, target) => {
    if (node === null || target === null) {
      return node === target;
    }

    if (node.val !== target.val) {
      return false;
    }

    return (
      deepCheck(node.left, target.left) && deepCheck(node.right, target.right)
    );
  };

  const dfs = (node, target) => {
    if (flag || !node) return;

    if (node.val === target.val) {
      if (deepCheck(node, target)) {
        flag = true;
      }
    }

    dfs(node.left, target);
    dfs(node.right, target);
  };

  dfs(root, subRoot);

  return flag;
};
