/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */

var flatten = function (head) {
  const dfs = (node, next = null) => {
    while (node) {
      const cachedNext = node.next;
      const nodeChild = node.child;

      if (nodeChild) {
        dfs(nodeChild, cachedNext ?? next);

        node.child = null;

        node.next = nodeChild;
        nodeChild.prev = node;

        node = cachedNext;
        continue;
      }

      if (!cachedNext) {
        if (next) {
          node.next = next;
          next.prev = node;
        }

        return;
      }

      node = cachedNext;
    }
  };

  dfs(head);

  return head;
};

export default flatten;
