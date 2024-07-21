/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const dfs = (root, targets) => {
    if (!root) return null;

    if (targets.has(root)) {
      return root;
    }

    const left = dfs(root.left, targets);
    const right = dfs(root.right, targets);

    if (!left) {
      return right;
    }

    if (!right) {
      return left;
    }

    return root;
  };

  return dfs(root, new Set([p, q]));
};
