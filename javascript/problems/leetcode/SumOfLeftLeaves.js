class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear] = value;
    this.rear += 1;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  peek() {
    return this.queue[this.front];
  }
  size() {
    return this.rear - this.front;
  }
  print() {
    console.log(this.queue)
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }
  convertTreeObj(arr) {
    if (!arr.length) return;
    const start = arr[0];
    this.root = new Node(start);
    const queue = new Queue();
    queue.enqueue([this.root, 1]);
    while(queue.size()) {
      const [nowNode, nowIndex] = queue.dequeue();
      const leftIndex = nowIndex * 2 - 1;
      const rightIndex = leftIndex + 1;
      if (arr[leftIndex]) { // left;
        nowNode.left = new Node(arr[leftIndex]);
        queue.enqueue([nowNode.left, leftIndex + 1]);
      }
      if (arr[rightIndex]) { // right;
        nowNode.right = new Node(arr[rightIndex]);
        queue.enqueue([nowNode.right, rightIndex + 1]); 
      }
    }
  }
}

const arr = [3,9,20,17,null,15,7];


const sumOfLeftLeaves = (arr) => {
  const tree = new Tree();
  tree.convertTreeObj(arr);
  return getResult(dfs(tree.root));
}
const dfs = (node, isLeft = false, res = []) => {
  if (!node.left && !node.right) return isLeft ? [node.value] : [];
  return [
      ...res, 
      ...(node.left ? dfs(node.left, true, res) : []), 
      ...(node.right ? dfs(node.right, false, res) : [])
  ];
}
const getResult = arr => arr.reduce((acc,cur) => acc + cur, 0)

console.log(sumOfLeftLeaves(arr))