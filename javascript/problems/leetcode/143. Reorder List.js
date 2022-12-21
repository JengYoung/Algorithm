/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }

 * 1. 일단 주어진 노드 개수는 10000개. 따라서 O(N ^ 2)를 만족하면 된다.
 * 2. 많은 방법이 있겠지만, 나는 메모이제이션을 활용했다. 결국 노드를 각각 캐싱하면 문제는 쉽게 풀린다.
 * 3. 따라서 시간 복잡도 O(N) 공간 복잡도 O(N)이면 주어진 문제를 쉽게 달성할 수 있다.
 */

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */

var reorderList = function (head) {
  let node = head;
  const memo = [];

  while (node !== null) {
    const now = node;
    memo.push(now);

    node = now.next;
    now.next = null;
  }

  const nodeLength = memo.length;
  const reorders = [];
  while (memo.length > Math.ceil(nodeLength / 2)) {
    reorders.push(memo.pop());
  }

  const reorderedArr = reorder(memo, reorders);

  reorderOriginalHead(reorderedArr);
};

function reorder(memo, reorders) {
  const res = [];
  for (let i = 0; i < reorders.length; i += 1) {
    res.push(memo[i]);
    res.push(reorders[i]);
  }

  if (memo.length !== reorders.length) {
    res.push(memo.pop());
  }

  return res;
}

function reorderOriginalHead(arr) {
  let head = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    const nextNode = arr[i];

    head.next = nextNode;
    head = nextNode;
  }
}
