/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

// eslint-disable-next-line no-unused-vars
var swapNodes = function (head, k) {
  const res = head;

  const nodes = {};
  let idx = 0;

  let now = head;
  while (now) {
    idx += 1;
    nodes[idx] = now;
    now = now.next;
  }

  const target = idx - k + 1;

  [nodes[k].val, nodes[target].val] = [nodes[target].val, nodes[k].val];

  return res;
};
