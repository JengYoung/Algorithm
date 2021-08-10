class Node {
    constructor(value = "") {
        this.value = value;
        this.children = new Map();
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(newValue) {
        const newNode = new Node(newValue);
        if (this.head === null) {
            this.head = this.tail = newNode;
        }
    }
}
class Trie {
    constructor() {
        this.root = new Node();
    }
    insert(string) {
        let currentNode = this.root;

        for (const char of string) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(
                    char,
                    new Node(currentNode.value + char)
                );
            }

            currentNode = currentNode.children.get(char);
        }
    }
    has(string) {
        let currentNode = this.root;

        for (const char of string) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char);
        }
        return true;
    }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
console.log(trie.has("cat"));
console.log(trie.has("can"));
console.log(trie.has("cap"));