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

  getCorrespondingLyricsCount(chars, lyricLength) {
    let currentNode = this.root;

    for (const char of chars) {
      if (!currentNode.children.has(char)) return 0;

      currentNode = currentNode.children.get(char);
    }

    return currentNode.childrenLengthCounts[lyricLength] ? currentNode.childrenLengthCounts[lyricLength] : 0;
  }
}

const solution = (words, queries) => {
  const result = [];

  const lyricsTrie = new Trie();
  const reversedLyricsTrie = new Trie();
  
  words.forEach(word => {
    lyricsTrie.insert(word);
    reversedLyricsTrie.insert([...word].reverse().join(''));
  })

  queries.forEach(query => {
    const length = query.length;
    const check = query.startsWith('?');
    const queryArr = check ? [...query].reverse() : [...query];
    while (queryArr[queryArr.length - 1] === '?') {
      queryArr.pop();
    }
    
    result.push((check ? reversedLyricsTrie : lyricsTrie).getCorrespondingLyricsCount(queryArr.join(''), length))
  })

  return result;
}

(() => {
  const words = ["frodo", "front", "frost", "frozen", "frame", "kakao"];
  const queries = ["fro??", "????o", "fr???", "fro???", "pro?"];
  console.log(solution(words, queries));
})();