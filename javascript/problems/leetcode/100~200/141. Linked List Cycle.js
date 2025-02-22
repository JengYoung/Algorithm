/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function (head) {
  let i = 0;

  while (i <= 10000) {
    if (!head?.next) {
      return false;
    }

    head = head.next;

    i += 1;
  }

  return true;
};
