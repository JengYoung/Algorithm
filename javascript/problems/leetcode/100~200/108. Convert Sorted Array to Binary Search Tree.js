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

const dfs = (nums) => {
  if (!nums.length) return null;

  const nodeIndex = Math.floor(nums.length / 2);
  const node = new TreeNode(nums[nodeIndex]);

  node.left = dfs(nums.slice(0, nodeIndex));
  node.right = dfs(nums.slice(nodeIndex + 1));

  return node;
};

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  return dfs(nums);
};
