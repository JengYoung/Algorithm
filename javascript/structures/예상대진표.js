class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 1. 이진 탐색 트리 객체를 구현하고, 크게 2가지 메서드를 만든다.
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 2. 이진 탐색 트리의 핵심은, 루트 값을 기준으로 작으면 왼쪽 자식 노드로, 크면 오른쪽 자식 노드로 두는 것이다. 이를 삽입 메서드에서 구현하자.
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    const nextNode = new Node(value);

    let node = this.root;

    while (node.left !== null && node.right !== null) {
      node = node.value >= value ? node.left : node.right;
    }

    if (node.value === value) {
      return;
    }

    if (node.value > value) {
      node.left = nextNode;
    } else {
      node.right = nextNode;
    }
  }

  // 3. 2번을 바탕으로, 서치 역시 위 성질을 이용하여 탐색하여 찾는다.
  search(value) {
    let node = this.root;
    while (node) {
      if (!node) {
        return false;
      }

      if (node.value === value) {
        return true;
      }

      if (node.value > value) {
        node = node.left;
        continue;
      }

      if (node.value < value) {
        node = node.right;
      }
    }

    return false;
  }
}

const solution = (lst, searchList) => {
  const binarySearchTree = new BinarySearchTree();

  // 4. 각 노드를 삽입한다.
  lst.forEach(function (v) {
    binarySearchTree.insert(v);
  });

  // 5. 각 서치에 관한 결과를 반환한다.
  return searchList.map((v) => binarySearchTree.search(v));
};

console.log(solution([5, 3, 8, 4, 2, 1, 7, 10], [1, 2, 5, 6]));
console.log(solution([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]));
