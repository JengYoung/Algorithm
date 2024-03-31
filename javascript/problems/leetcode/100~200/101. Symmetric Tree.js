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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (root.val === null) return true;
  if (root.left === null && root.right === null) return true;

  let flag = true;

  const dfs = (leftRoot, rightRoot) => {
    if (leftRoot === null && rightRoot === null) {
      return;
    }

    if (
      leftRoot === null ||
      rightRoot === null ||
      leftRoot.val !== rightRoot.val
    ) {
      flag = false;
      return;
    }

    dfs(leftRoot.right, rightRoot.left);
    dfs(leftRoot.left, rightRoot.right);
  };

  dfs(root.left, root.right);

  return flag;
};
