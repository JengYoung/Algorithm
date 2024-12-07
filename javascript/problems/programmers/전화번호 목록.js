class Node {
  constructor(value = '', isLast = false) {
    this.value = value;
    this.children = new Map();
    this.isLast = isLast;
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

    currentNode.isLast = true;
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

  hasPrefixOf(string) {
    let currentNode = this.root;

    if (this.has(string)) {
      console.log('HI');
      return true;
    }

    for (const char of string) {
      if (currentNode.isLast) {
        return true;
      }

      if (!currentNode.children.has(char)) {
        break;
      }

      currentNode = currentNode.children.get(char);
    }

    return false;
  }
}

function solution(phone_book) {
  const trie = new Trie();

  for (const phoneNumber of phone_book) {
    if (trie.hasPrefixOf(phoneNumber)) {
      return false;
    }

    trie.insert(phoneNumber);
  }

  return true;
}

(() => {
  console.log(solution(['119', '97674223', '1195524421'])); // false
})();

(() => {
  console.log(solution(['123', '456', '789'])); // true
})();

(() => {
  console.log(solution(['12', '123', '1235', '567', '88'])); // false
})();

(() => {
  console.log(solution(['123', '123'])); // true
})();

(() => {
  console.log(solution(['1195524421', '119', '97674223'])); // false
})();
