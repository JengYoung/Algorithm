class Node {
  constructor(value = '') {
    this.value = value;
    this.children = new Map();
    this.cnt = 0;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(string) {
    let currentNode = this.root;
    currentNode.cnt += 1;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char));
      }

      currentNode = currentNode.children.get(char);
      currentNode.cnt += 1;
    }
  }

  getCount(string) {
    let cnt = 0;
    let currentNode = this.root;
    for (const char of string) {
      cnt += 1;

      currentNode = currentNode.children.get(char);
      if (currentNode.cnt === 1) break;
    }

    return cnt;
  }
}

const solution = (words) => {
  let result = 0;
  const trie = new Trie();

  for (let i = 0; i < words.length; i += 1) {
    trie.insert(words[i]);
  }

  for (let i = 0; i < words.length; i += 1) {
    result += trie.getCount(words[i]);
  }

  return result;
};

console.log(solution(['word', 'war', 'warrior', 'world']));
