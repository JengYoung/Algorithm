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
var mergeNodes = function (head) {
  let cacheHead = head;
  while (!cacheHead.val) {
    cacheHead = cacheHead.next;
  }

  let prevNode;

  while (head) {
    if (!head.val) {
      if (prevNode) {
        prevNode.next = head.next;
      }

      prevNode = head.next;
      head = head.next;

      continue;
    }

    if (head.next) {
      prevNode.val += head.next.val;
    }

    head = head.next;
  }

  return cacheHead;
};

export default mergeNodes;
