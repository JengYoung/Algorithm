/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let size = 0;

  let now = head;

  while (now.val) {
    now = now.next;
    size += 1;

    if (now === null) {
      break;
    }
  }

  let half = Math.floor(size / 2);

  let result = head;

  while (half > 0) {
    half -= 1;

    result = result.next;
  }

  return result;
};
