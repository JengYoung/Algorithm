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

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(value) {
    let nowNode = this.root;

    [...value].forEach((v, idx) => {
      const isLast = idx === value.length - 1;

      if (!nowNode.children.has(v)) {
        const node = new Node(v, { isLast });

        nowNode.children.set(v, node);
      }

      nowNode = nowNode.children.get(v);
      if (isLast) {
        nowNode.isLast = isLast;
      }
    });
  }

  search(value) {
    let flag = false;

    const dfs = (node, values) => {
      if (!values.length && node.isLast) {
        flag = true;
        return;
      }

      const WILDCARD = '.';
      const character = values.shift();

      if (character === WILDCARD) {
        node.children.forEach((nextNode) => {
          if (flag) {
            return;
          }

          dfs(nextNode, [...values]);
        });

        return;
      }

      const nextNode = node.children.get(character);

      if (!nextNode) {
        return;
      }

      dfs(nextNode, [...values]);
    };

    dfs(this.root, [...value]);

    return flag;
  }
}

var WordDictionary = function () {
  this.wordDictionary = new Trie();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  this.wordDictionary.insert(word);

  return null;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.wordDictionary.search(word);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
