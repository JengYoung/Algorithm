function NewNode(value, x, y) {
  this.val = value;

  this.x = x;
  this.y = y;

  this.left = null;
  this.right = null;

  this.insert = (value, x, y) => {
    if (this.x >= x) {
      if (this.left) this.left.insert(value, x, y);
      else this.left = new NewNode(value, x, y);
    } else {
      if (this.right) this.right.insert(value, x, y);
      else this.right = new NewNode(value, x, y);
    }
  };

  this.preOrder = (arr = []) => {
    arr.push(this.val);
    if (!this.left && !this.right) {
      return arr;
    }

    if (this.left) {
      this.left.preOrder(arr);
    }

    if (this.right) {
      this.right.preOrder(arr);
    }

    return arr;
  };

  this.postOrder = (arr = []) => {
    if (!this.left && !this.right) {
      arr.push(this.val);
      return arr;
    }

    if (this.left) {
      this.left.postOrder(arr);
    }

    if (this.right) {
      this.right.postOrder(arr);
    }

    arr.push(this.val);

    return arr;
  };

  return this;
}

const makeTree = (nodes) => {
  const { value, coord } = nodes[0];
  const [x, y] = coord;

  const tree = new NewNode(value, x, y);

  for (let i = 1; i < nodes.length; i += 1) {
    const { value, coord } = nodes[i];
    const [x, y] = coord;

    tree.insert(value, x, y);
  }

  return tree;
};

const solution = (nodeinfo) => {
  const sortedNodeInfo = [...nodeinfo]
    .map((coord, index) => ({ value: index + 1, coord }))
    .sort((a, b) => {
      if (b.coord[1] !== a.coord[1]) return b.coord[1] - a.coord[1];

      return a.coord[0] - b.coord[0];
    });

  const tree = makeTree(sortedNodeInfo);

  return [tree.preOrder(), tree.postOrder()];
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
