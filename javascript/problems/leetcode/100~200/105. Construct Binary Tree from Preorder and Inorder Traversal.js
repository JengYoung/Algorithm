/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length) {
    return null;
  }

  if (preorder.length === 1) {
    return new TreeNode(preorder[0]);
  }

  const root = preorder[0];

  const rootInorderIndex = inorder.indexOf(root);

  const leftRoot =
    preorder.length === 1
      ? null
      : buildTree(
          preorder.slice(1, 1 + rootInorderIndex),
          inorder.slice(0, rootInorderIndex)
        );

  const rightRoot =
    root === inorder.at(-1)
      ? null
      : buildTree(
          preorder.slice(1 + rootInorderIndex),
          inorder.slice(1 + rootInorderIndex)
        );

  return new TreeNode(root, leftRoot, rightRoot);
};
