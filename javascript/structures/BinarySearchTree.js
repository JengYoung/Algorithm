// class Node {
//     constructor(data, left = null, right = null) {
//         this.data = data;
//         this.left = left;
//         this.right = right;
//     }
// }

// class BST {
//     constructor() {
//         this.root = null;
//     }

// add(data) {
//     const node = this.root;
//     if (node === null) {
//         this.root = new Node(data);
//         return;
//     } else {
//         const searchTree = function (node) {
//             if (data < node.data) {
//                 if (node.left === null) {
//                     node.left = new Node(data);
//                     return;
//                 } else if (node.left !== null) {
//                     //left에 함수 있을 시 재귀 함수 적용
//                     return searchTree(node.left);
//                 }
//             } else if (data > node.data) {
//                 if (node.right === null) {
//                     node.right = new Node(data);
//                     return;
//                 } else if (node.right !== null) {
//                     return searchTree(node.right);
//                 }
//             } else {
//                 return null;
//             }
//         };
//     return searchTree(node);
//     }
// }

// remove(data) {
//     //제거할 data의 파라미터를 두번째에 놓았다.
//     const removeNode = function (node, data) {
//         if (node == null) {
//             return null;
//         }
//         if (data == node.data) {
//             // node has no children ~ 밑에 뿌리가 없는 노드
//             if (node.left == null && node.right == null) {
//                 return null;
//             }
//             // node has no left child  ~ left는 없는 경우 node right가 해당 삭제 데이터에 들어간다.
//             if (node.left == null) {
//                 return node.right;
//             }
//             // node has no right child 
//             if (node.right == null) {
//                 return node.left;
//             }
//             // node has two children
//             var tempNode = node.right;
//             //tempNode는 삭제할 node의 right가 되고
//             while (tempNode.left !== null) {
//                 tempNode = tempNode.left; //다시 node right의 left가 된다.
//             }
//             node.data = tempNode.data; //그리고 삭제 node에는 위의 tempnode가 들어가게된다.
//             node.right = removeNode(node.right, tempNode.data);
//             return node;
//         } else if (data < node.data) {
//             node.left = removeNode(node.left, data);
//             return node;
//         } else {
//             node.right = removeNode(node.right, data);
//             return node;
//         }
//     }
//     this.root = removeNode(this.root, data);
// }
// }

// const bst = new BST();

// bst.add(9);
// bst.add(4);
// bst.add(17);
// bst.add(3);
// bst.add(6);
// bst.add(22);
// bst.add(5);
// bst.add(7);
// bst.add(20);
// //console.log(bst)
// //bst.remove(4)
// console.log(bst)


class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while (currentNode !== null) {
            if (currentNode.value < value) {
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    break;
                }
                currentNode = currentNode.right;
            } else {
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    break;
                }
                currentNode = currentNode.left;
            }
        }
    }
    
    has(value) {
        let currentNode = this.root;
        while (currentNode !== null) {
            if (currentNode.value === value) {
                return true;
            }

            if (currentNode.value < value) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }
        return false;
    }
}

const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(4);
tree.insert(7);
tree.insert(8);
tree.insert(5);
tree.insert(6);
tree.insert(2);
console.log(tree.has(8));
console.log(tree.has(1));