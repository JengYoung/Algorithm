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
var diameterOfBinaryTree = function (root) {
  let max = 0;

  const dfs = (node, depth) => {
    if (!node) {
      return depth;
    }

    // 최대인 것을 추출하게끔 뒤에서 return
    const left = dfs(node.left, depth);
    const right = dfs(node.right, depth);

    const now = left + right; // 현재 노드의 최대길이

    if (now > max) {
      max = now;
    }

    return Math.max(left, right) + 1; // 카운트를 반영
  };

  dfs(root, 0);

  return max;
};
