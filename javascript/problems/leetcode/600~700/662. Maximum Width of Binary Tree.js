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
var widthOfBinaryTree = function(root) {
    const levels = new Map();

    const dfs = (node, depth, point = 0) => {
        if (!node) {
            return;
        }

        levels.set(depth, [...(levels.get(depth) ?? []), point]);

        if (node?.left) {
            dfs(node.left, depth + 1, point * 2n - 1n)
        }

        if (node?.right) {
            dfs(node.right, depth + 1, point * 2n)
        }
    }

    dfs(root, 0, BigInt(1));

    if (!levels.size) {
        return 0;
    }

    let result = BigInt(0);

    levels.forEach((values, key) => {
        const diff = BigInt(values?.at(-1) ?? 0) - BigInt(values?.[0] ?? 0);
        if (diff > result) {
            result = diff;
        }
    })

    return Number(result) + 1;
};