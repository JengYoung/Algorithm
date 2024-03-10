class Node {
  constructor(value) {
    this.value = value;
    this.isFinished = false;
    this.children = new Map();
    this.cache = new Set();
  }
}

var Trie = function () {
  this.values = new Node(null);

  return this;
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  if (this.values.cache.has(word)) {
    return;
  }

  let nowNode = this.values;

  for (const s of word) {
    const node = new Node(s);

    if (!nowNode.children.has(s)) {
      nowNode.children.set(s, node);
    }

    nowNode.cache.add(word);
    nowNode = nowNode.children.get(s);
  }

  nowNode.isFinished = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  if (this.values.cache.has(word)) {
    return true;
  }

  return this.values.cache.has(word);
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let nowNode = this.values;

  for (const s of prefix) {
    if (!nowNode.children.has(s)) {
      return false;
    }

    nowNode = nowNode.children.get(s);
  }

  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
