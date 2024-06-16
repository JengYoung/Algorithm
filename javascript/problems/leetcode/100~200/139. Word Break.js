class Node {
  constructor(value = '') {
    this.value = value;
    this.isRegistered = false;
    this.children = new Map();
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
        currentNode.children.set(char, new Node(currentNode.value + char));
      }

      currentNode = currentNode.children.get(char);
    }

    currentNode.isRegistered = true;
  }

  findNode(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return null;
      }

      currentNode = currentNode.children.get(char);
    }

    return currentNode;
  }

  isDict(string) {
    return !!this.findNode(string)?.isRegistered;
  }

  has(string) {
    return !!this.findNode(string);
  }
}

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const trie = new Trie();

  wordDict.forEach((word) => trie.insert(word));

  const visited = new Set();

  const find = (string) => {
    if (string === '') return true;

    if (visited.has(string)) return false;

    visited.add(string);

    let next = '';

    for (const char of string) {
      next += char;

      if (!trie.has(next)) {
        return false;
      }

      if (trie.isDict(next) && find(string.replace(next, ''))) {
        return true;
      }
    }

    return false;
  };

  return find(s);
};
