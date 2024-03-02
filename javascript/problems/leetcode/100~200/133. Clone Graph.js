/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function (node) {
  if (node === null) return node;

  const clone = (node, visited = new Map()) => {
    const now = new Node(node.val);

    visited.set(node.val, now);
    const nowNeighbors = visited.get(node.val).neighbors;

    node.neighbors.forEach((neighbor) => {
      const cachedNeighbor = visited.get(neighbor.val);

      if (visited.has(neighbor.val)) {
        nowNeighbors.push(cachedNeighbor);
        return;
      }

      const nextNeighbor = clone(neighbor, visited);
      nowNeighbors.push(nextNeighbor);
    });

    return now;
  };

  return clone(node);
};
