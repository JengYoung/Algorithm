/**
 * 1. Trie를 이용한다.
 * 2. Trie 자료구조를 구현한다. 관건은 와일드카드의 케이스를 어떻게 구현할 수 있느냐이다. 이는 재귀함수를 이용한다.
 * 3. add 메서드는 Trie 자료구조 그대로 구현하되, 만약 와일드카드에 대응되는 문자가 올 경우에는 다음 노드 전체를 완전탐색시킨다.
 * 4. 다만, 이미 결과가 도출이 되었다면 더이상 재귀를 돌 이유가 없다. 이는 flag를 하나 만들자.
 * 5. search 메서드를 실행한 결과를 반환한다.
 */

class Node {
  constructor(value, options) {
    this.value = value;
    this.isLast = options?.isLast ?? false;
    this.children = new Map();
  }
}

var WordDictionary = function () {
  this.root = new Node();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;

  for (let i = 0; i < word.length; i += 1) {
    const char = word[i];

    if (node.children.has(char)) {
      node = node.children.get(char);
      continue;
    }

    const nextNode = new Node(char);
    node.children.set(char, nextNode);

    node = nextNode;
  }

  node.isLast = true;

  return null;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const WILDCARD = '.';
  let flag = false;

  const recursiveSearch = (node, idx) => {
    if (flag) {
      return;
    }

    if (word.length === idx && node.isLast) {
      flag = true;
      return;
    }

    const char = word[idx];

    if (char === WILDCARD) {
      for (const childNode of node.children.values()) {
        recursiveSearch(childNode, idx + 1);
      }

      return;
    }

    if (!node.children.has(char)) {
      return;
    }

    const nextNode = node.children.get(char);
    recursiveSearch(nextNode, idx + 1);
  };

  recursiveSearch(this.root, 0);

  return flag;
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
