// 트리
/*
    - Left = Index * 2
    - Right = Index * 2 + 1
    - Parent = floor(Index /  2)
*/ 
// const tree = [
// 	undefined,
// 	9,
// 	3, 8, 
// 	2, 5, undefined, 7,
// 	undefined, undefined, undefined, 4
// ];

// 이진 트리
class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }
    enqueue(value) {
        this.queue[this.rear++] = value;
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
    display() {
        const queue = new Queue();
        queue.enqueue(this.root);
        while (queue.size()) {
            console.log(queue)
            const currentNode = queue.dequeue();
            console.log("display: ",currentNode.value);
            if (currentNode.left) queue.enqueue(currentNode.left);
            if (currentNode.right) queue.enqueue(currentNode.right);
        }
    }
    print() {
        console.log(this.root)
    }
}
const tree = new Tree(new Node(9));
tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(5);
tree.root.right.right = new Node(7);
tree.root.left.right.right = new Node(4);

tree.print()
console.log(tree.display())
