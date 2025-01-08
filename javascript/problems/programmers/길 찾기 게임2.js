class Node {
  constructor(value, x, y) {
    this.value = value;

    this.x = x;
    this.y = y;

    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = new Node(null);
  }

  insert(value, x, y, node = this.root) {
    const nowNode = new Node(value, x, y);

    if (!node.value) {
      this.root = nowNode;
      return;
    }

    if (node.x >= x) {
      if (node.left) {
        this.insert(value, x, y, node.left);
        return;
      }

      node.left = nowNode;
      return;
    }

    if (node.right) {
      this.insert(value, x, y, node.right);
      return;
    }

    node.right = nowNode;
  }
}

const preOrder = (node, res = []) => {
  if (!node) {
    return res;
  }

  console.log(node.value);

  res.push(node.value);

  preOrder(node.left, res);
  preOrder(node.right, res);

  return res;
};

const postOrder = (node, res = []) => {
  if (!node) {
    return res;
  }

  postOrder(node.left, res);
  postOrder(node.right, res);

  res.push(node.value);

  return res;
};

const solution = (nodeinfo) => {
  const nodeInfos = nodeinfo
    .map((v, i) => v.concat(i + 1))
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];

      return a[0] - b[0];
    });

  const tree = new Tree();

  nodeInfos.forEach(([x, y, value]) => {
    tree.insert(value, x, y);
  });

  return [preOrder(tree.root), postOrder(tree.root)];
};

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);
