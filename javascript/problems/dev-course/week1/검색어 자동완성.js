"use strict"
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
    enqueue(newValue) {
        const newNode = new QueueNode(newValue);
        if (this.head === null) this.head = this.tail = newNode; 
        else this.tail.next = this.tail = newNode;
        this.size += 1;
    }
    dequeue() {
        const headValue = this.head.value;
        this.head = this.head.next;
        this.size -= 1;
        return headValue;
    }
    peek() {
        return this.head.value;
    } 
}

class TrieNode {
    constructor(value = "") {
        this.value = value;
        this.isInputted = false; // 예전에 입력되었는지를 표시합니다.
        this.children = new Map();
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {any} string 
     * @returns {boolean}
     * @description 타입을 검사하며 숫자나 문자면 true, 아니면 false를 반환합니다.
     */
    checkValidType(string) {
        return (typeof string === "string" || typeof string === "number") ? true : false;
    }

    /**
     * @param {string|number} string 
     * @returns {string}
     * @description 숫자는 문자로 치환하며, 영어는 소문자로, 좌우 공백 제거 및 사이 공백은 1칸으로 정제된 데이터를 반환합니다.
     */
    cleanUpStringData(string) {
        if (!this.checkValidType(string)) return;
        return string.toString(10).toLowerCase().replace(/ +/gi, " ").trim();
    }

    /**
     * @param {any} string 
     * @returns string이 숫자나 문자가 아니라면 수행하지 않으며, 들어온 string을 정제 후 넣습니다.
     */
    insert(string) {
        if (!this.checkValidType(string)) return;
        string = this.cleanUpStringData(string);
        let currentNode = this.root;
        for (const char of string) {
            const { value, children } = currentNode;
            if (!children.has(char)) children.set(char, new TrieNode(value + char));
            currentNode = children.get(char);
        }
        currentNode.isInputted = true;
    }

    /**
     * @param {string|number} string 
     * @returns {Object}
     * @description string을 value로 갖는 노드를 반환합니다. 없거나 타입이 문자가 아닐 경우 null을 리턴합니다.
     */
    getNodeByString(string) {
        if (typeof string !== "string") return null;
        let currentNode = this.root;
        for (const char of string) {
            const { children } = currentNode;
            if (!children.has(char)) return null;
            currentNode = children.get(char);
        }
        return currentNode;
    }
    /**
     * @param {string} root
     * @param {Array} dataset
     * @returns {Array}
     * @description 레벨순위를 통해 현재 자동완성할 string들을 배열에 담아 반환합니다.
     */
    getDatasetBylevelOrder(root, dataset) {
        const queue = new Queue();
        queue.enqueue(root);
        while (queue.size !== 0) {
            const { value, children, isInputted } = queue.dequeue();
            if (isInputted) dataset.push(value);
            if (!children) continue;
            for (const [value, child] of children) {
                queue.enqueue(child);
            };
        }
        return dataset;
    }

    /**
     * @param {any} 
     * @returns {Array}
     * @description 만약 string type이 숫자나 문자가 아니라면 빈 배열을 리턴하며 정제된 string이 포함된 자동완성 검색어를 배열에 담아 반환합니다.
     */
    getAutoCompletedDatasetByLevelOrder(string) {
        if (!this.checkValidType(string)) return [];
        string = this.cleanUpStringData(string);
        const root = this.getNodeByString(string);
        if (root === null || string === "") return [];
        const autoCompletedDataset = [];
        return this.getDatasetBylevelOrder(root, autoCompletedDataset);
    }
}

(() => {
    /**
     * ! TEST CASE
     * * 대략적으로 예상 가능한 엣지 케이스 
     * * (구글 자동완성 기준으로 입력하면서 생각해봤습니다.)
     * 
     * 1. 좌우 공백, 사이에 여러 공백이 있어도 정제 (사이의 여러 공백은 1글자로 처리)
     * 2. 대문자가 있어도 소문자로 일단 정제해서 처리 (자동완성을 보니 소문자로만 처리됨)
     * 3. 만약 아무것도 쓰지 않는다면 자동완성이 뜨지 않는다. 
     *    (실제로 input data를 정제하는지는 모르겠으나, 처리한다는 가정하에 진행)
     * 4. 초성 검색이 된다. (시간이 꽤 걸릴 것 같아서 과제 제출 후 구현 시도해보겠습니다! 🥺)
     * 5. 처음 글자를 모음으로 쓰면 영어로 쓴 것으로 인식한다. 
     *    (4번이 가능해야 선행됨. ㅕㅜㅑ챙ㄷ -> unicode로 입력되려면 챙을 분리시키고 영어로 되어야 하므로)
     * 6. 혹여나 문자 데이터가 아닌 숫자가 들어온 경우는 문자열로 바꿔준다. 기타 데이터들은 오류 방지를 위해 리턴한다.
     * ! 결론: 4 ~ 5의 엣지 케이스를 제외한 자동완성 코드를 구현하겠습니다!
     */
    const trie = new Trie();

    // 1. 자동완성 case
    trie.insert("  lang  uage  book"); // false
    trie.insert("            language books "); // true
    trie.insert("language      learning  "); // true
    trie.insert("          language model"); // true
    
    // 2. 자동완성 case
    trie.insert("Language skill") // true (language skill)
    trie.insert("LANGUAGE SKILLS") // true (language skills)
    trie.insert("lanGuAgES") // true (lanuages)
    
    // 3. 입력하지 않을 시, 공백만 있을 시
    trie.insert("");
    trie.insert(" ");
    trie.insert(1230); // "1230"
    // trie.insert(0123); // "use strict"를 통한 예외처리
    
    console.log(trie.getAutoCompletedDatasetByLevelOrder([]));
    /*
        < 결과 > 
        [
            'languages',
            'language books',
            'language model',
            'language skill',
            'language skills',
            'language learning'
        ]
    */ 
})()