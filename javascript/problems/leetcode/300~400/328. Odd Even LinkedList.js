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
/**
 * 1. 결과적으로 홀수를 앞에다 놓는다.
 * 2. 새롭게 나온 짝수를 머리로 설정하고, 홀수의 다음을 기존 짝수 머리와 연결한다.
 */
function oddEvenList(head) {
  if (head === null) return head;

  const evenHead = head.next;
  let odd = head;

  while (odd?.next?.next) {
    const even = odd.next;

    odd.next = odd.next.next;
    odd = odd.next;

    even.next = even.next.next;
  }

  odd.next = evenHead;

  return head;
}
