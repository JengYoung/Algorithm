class QueueNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
  
    enqueue = newValue => {
      const newNode = new QueueNode(newValue);
  
      if (this.head === null) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.size += 1;
    };
  
    dequeue = () => {
      const value = this.head.value;
      this.head = this.head.next;
      this.size -= 1;
      return value;
    };
  
    peek = () => {
      return this.head.value;
    };
  
    display = () => {
      let currNode = this.head;
      let displayString = '[';
  
      while (currNode !== null) {
        displayString += `${currNode.value}, `;
        currNode = currNode.next;
      }
      displayString = displayString.substr(0, displayString.length - 2);
      displayString += ']';
      console.log(displayString);
    };
  }
  
  class TrieNode {
    constructor(value = '') {
      this.value = value;
      this.children = new Map();
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let currNode = this.root;
  
      for (const char of word) {
        if (!currNode.children.has(char)) {
          currNode.children.set(char, new TrieNode(currNode.value + char));
        }
        currNode = currNode.children.get(char);
      }
    };
  
    has(word) {
      let currNode = this.root;
  
      for (const char of word) {
        if (!currNode.children.has(char)) {
          return false;
        }
        currNode = currNode.children.get(char);
      }
  
      return true;
    };
  
    autoCompleteBFS(prefix) {
      const nodeQueue = new Queue();
      const recomendedWords = [];
      const firstNode = this.findNodeByPrefix(prefix);
  
      if (firstNode === null) {
        return [];
      }
  
      nodeQueue.enqueue(firstNode);
  
      while (nodeQueue.size > 0) {
        const { value: currNodeValue, children } = nodeQueue.dequeue();
  
        if (children.size > 0) {
          [...children.values()].forEach(childNode => {
            nodeQueue.enqueue(childNode);
          });
        } else {
          recomendedWords.push(currNodeValue);
        }
      }
  
      return recomendedWords;
    };
  
    autoCompleteDFS(prefix) {
      const nodeStack = [];
      const recomendedWords = [];
      const firstNode = this.findNodeByPrefix(prefix);
  
      if (firstNode === null) {
        return [];
      }
  
      nodeStack.push(firstNode);
  
      while (nodeStack.length > 0) {
        const { value: currNodeValue, children } = nodeStack.pop();
  
        if (children.size > 0) {
          [...children.values()].forEach(childNode => {
            nodeStack.push(childNode);
          });
        } else {
          recomendedWords.push(currNodeValue);
        }
      }
  
      return recomendedWords;
    };
  
    findNodeByPrefix(prefix) {
        let targetNode = this.root;

        for (const char of prefix) {
          if (targetNode.children.get(char)) {
            targetNode = targetNode.children.get(char);
            continue;
          } else {
            return null;
          }
        }
    
        return targetNode;
      };
    }
    
    const trie = new Trie();
    trie.insert('cat');
    trie.insert('can');
    trie.insert('cell');
    trie.insert('bap');
    trie.insert('dam');
    
    // 자동완성 테스트 - BFS
    console.log(trie.autoCompleteBFS('')); // cat can bap dam cell
    console.log(trie.autoCompleteBFS('c')); // cat can cell
    console.log(trie.autoCompleteBFS('ca')); // cat can
    console.log(trie.autoCompleteBFS('ce')); // cell
    console.log(trie.autoCompleteBFS('f')); // null
    
    // 자동완성 테스트 - DFS
    console.log(trie.autoCompleteDFS('')); // dam bap cell can cat
    console.log(trie.autoCompleteDFS('c')); // cell can cat
    console.log(trie.autoCompleteDFS('ca')); // can cat
    console.log(trie.autoCompleteDFS('ce')); // cell
    console.log(trie.autoCompleteDFS('f')); // null

    console.log(trie.prototype)