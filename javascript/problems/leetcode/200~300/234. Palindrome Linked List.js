/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  /**
   * 런너 기법 실행
   * - slow: 느리게 가는 동안 뒷쪽으로 이동하는 포인터를 만들어내고, 후에 비교하기 위해 계속 나아감.
   * - fast: 반쪽으로 나뉘는 경로를 찾기 위해 slow보다 2배 더 빠르게 연결리스트를 탐색
   */
  let slow = head; // 느리게 가는 포인터
  let fast = head; // 빠르게 가는 포인터

  let prev = null; // 절반의 연결리스트 노드를 거꾸로 만들기 위한 포인터 1
  let next = head; // 절반의 연결리스트 노드를 거꾸로 만들기 위한 포인터 2

  while (fast.next) {
    fast = fast.next;

    next = slow.next;

    slow.next = prev; // 종점이 됨

    prev = slow; // prev 뒤쪽으로 가는 head <-> slow 앞쪽으로 가는 head

    slow = next;

    fast = fast.next;

    if (fast === null) {
      break;
    }
  }

  // 홀수일 경우에 대한 예외처리 진행
  if (fast) {
    slow = slow.next; // 짝수 vs 홀수
  }

  while (slow) {
    console.log({ slow, prev });
    if (slow.val !== prev.val) {
      return false;
    }

    slow = slow.next;
    prev = prev.next;
  }

  return true;
};
