class Node {
  constructor(value = "") {
    this.value = value;
    this.childrenLengthCounts = {};
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(chars) {
    let currentNode = this.root;

    for (const char of chars) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char))
      }
      currentNode.childrenLengthCounts[chars.length] = currentNode.childrenLengthCounts[chars.length] 
        ? currentNode.childrenLengthCounts[chars.length] + 1 
        : 1;
      currentNode = currentNode.children.get(char);
    }

  }

  has(chars) {
    let currentNode = this.root;

    for (const char of chars) {
      if (!currentNode.children.has(char)) {
        return false;
      }

      currentNode = currentNode.children.get(char);
    }
    return true;
  }

  getCorrespondingLyrics(chars, lyricLength) {
    let currentNode = this.root;
    for (const char of chars) {
      if (!currentNode.children.has(char)) return 0;

      currentNode = currentNode.children.get(char);
    }
    return currentNode.childrenLengthCounts[lyricLength] ? currentNode.childrenLengthCounts[lyricLength] : 0;
  }
}

const trie = new Trie();
trie.insert("cat");
trie.insert("can");
trie.insert("cpn");
trie.insert("cant");
console.log(trie.has("cat"));
console.log(trie.has("can"));
console.log(trie.has("cap"));

console.log(trie.getCorrespondingLyrics("ca", 3))