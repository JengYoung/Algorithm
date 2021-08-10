"use strict"

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
    
    /**
     * @param {Object} node
     * @param {Array} stack
     * @returns {Array} 
     * @description 재귀함수를 통해 트리에 대해 전위, 중위, 후위 순회를 하여 결과 값을 배열로 담아 반환합니다.
     */
    preOrderByStack(node, stack = []) {
        if (node === null) return;
        const { left, right, value } = node;
        stack.push(value);
        if (left !== null) this.preOrderByStack(left, stack);
        if (right !== null) this.preOrderByStack(right, stack);
        return stack;
    }
    inOrderByStack(node, stack = []) {
        if (node === null) return stack.push(value);
        const { left, right, value } = node;
        if (left !== null) this.inOrderByStack(left, stack);
        stack.push(value);
        if (right !== null) this.inOrderByStack(right, stack);
        return stack;
    }
    postOrderByStack(node, stack = []) {
        if (node === null) return stack.push(value);
        const { left, right, value } = node;
        if (left !== null) this.postOrderByStack(left, stack);
        if (right !== null) this.postOrderByStack(right, stack);
        stack.push(value);
        return stack;
    }
}

// 실행
(() => {
    const tree = new Tree(new Node("A"));

    // INPUT CASE - 일반적인 트리
    tree.root.left = new Node("B");
    tree.root.right = new Node("C");
    tree.root.left.left = new Node("D");
    tree.root.right.left = new Node("E");
    tree.root.right.right = new Node("F");
    tree.root.right.right.right = new Node("G");
    /*
        < 결과 >
        [
            'A', 'B', 'D',
            'C', 'E', 'F',
            'G'
        ]
        [
            'D', 'B', 'A',
            'E', 'C', 'F',
            'G'
        ]
        [
            'D', 'B', 'E',
            'G', 'F', 'C',
            'A'
        ]
    */ 

    // INPUT CASE - 편향 트리
    // tree.root.left = new Node("B");
    // tree.root.left.left = new Node("C");
    // tree.root.left.left.left = new Node("D");
    // tree.root.left.left.left.left = new Node("E");
    // tree.root.left.left.left.left.left = new Node("F");
    // tree.root.left.left.left.left.left.left = new Node("G");
    /*
        < 결과 >
        [
            'A', 'B', 'C',
            'D', 'E', 'F',
            'G'
        ]
        [
            'G', 'F', 'E',
            'D', 'C', 'B',
            'A'
        ]
        [
            'G', 'F', 'E',
            'D', 'C', 'B',
            'A'
        ]
    */ 

    const { root } = tree;
    console.log(tree.preOrderByStack(root))
    console.log(tree.inOrderByStack(root))
    console.log(tree.postOrderByStack(root));
})();
(() => {
    const tree = new Tree(new Node("A"));

    // INPUT CASE - 일반적인 트리
    tree.root.left = new Node("B");
    tree.root.right = new Node("C");
    tree.root.left.left = new Node("D");
    tree.root.right.left = new Node("E");
    tree.root.right.right = new Node("F");
    tree.root.right.right.right = new Node("G");
    /*
        < 결과 >
        [
            'A', 'B', 'D',
            'C', 'E', 'F',
            'G'
        ]
        [
            'D', 'B', 'A',
            'E', 'C', 'F',
            'G'
        ]
        [
            'D', 'B', 'E',
            'G', 'F', 'C',
            'A'
        ]
    */ 

    // INPUT CASE - 편향 트리
    // tree.root.left = new Node("B");
    // tree.root.left.left = new Node("C");
    // tree.root.left.left.left = new Node("D");
    // tree.root.left.left.left.left = new Node("E");
    // tree.root.left.left.left.left.left = new Node("F");
    // tree.root.left.left.left.left.left.left = new Node("G");
    /*
        < 결과 >
        [
            'A', 'B', 'C',
            'D', 'E', 'F',
            'G'
        ]
        [
            'G', 'F', 'E',
            'D', 'C', 'B',
            'A'
        ]
        [
            'G', 'F', 'E',
            'D', 'C', 'B',
            'A'
        ]
    */ 

    const { root } = tree;
    console.log(tree.preOrderByStack(root))
    console.log(tree.inOrderByStack(root))
    console.log(tree.postOrderByStack(root));
})();