/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let nodeHead = head;

  const lists = {};
  lists.length = 0;

  let index = 0;
  while (true) {
    lists[index] = nodeHead;
    nodeHead = nodeHead.next;
    index += 1;
    lists.length += 1;

    if (nodeHead === null) {
      break;
    }
  }

  const targetIndex = lists.length - n;

  if (targetIndex === 0) {
    head = head.next;
    return head;
  }

  lists[targetIndex - 1].next = lists[targetIndex].next;

  return head;
};
