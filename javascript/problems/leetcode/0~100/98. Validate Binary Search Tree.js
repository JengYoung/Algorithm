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
var isValidBST = function (root, range = [-Infinity, Infinity]) {
  if (!root) {
    return true;
  }

  const [from, to] = range;
  const isValid = root.val > from && root.val < to;

  if (!isValid) {
    return false;
  }

  const isLeftValid = isValidBST(root.left, [from, root.val]);
  const isRightValid = isValidBST(root.right, [root.val, to]);

  return isLeftValid && isRightValid;
};
