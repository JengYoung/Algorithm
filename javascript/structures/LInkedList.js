class LinkedList {
    constructor(value) {
        this.head = this.createNewNode(value);
        this.tail = this.head;
        this.length = 1;
    }
    // List의 맨 뒤쪽에 value를 추가
    append(value) {
        const newNode = this.createNewNode(value)
        this.tail.next = newNode; // head의 next가 newNode로 되고
        this.tail = newNode; // tail을 새로 newNode의 주소로 할당
        this.length++; // 길이가 늘어났으니 1 추가
        return this;
    }

    // List의 맨 앞쪽에 value를 추가
    prepend(value) {
        const newNode = this.createNewNode(value)
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }

    // 최종 List를 출력
    printList() {
        const arr = [];
        let currentNode = this.head;
        while(currentNode !== null) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
    // 리스트의 idx에 해당하는 인덱스에 value를 삽입
    insert(idx, value) {

        //만약 현재 해당하는 인덱스보다 더 큰 인덱스에 추가한다면, 그냥 맨 뒤에 삽입해버림. (선택사항)
        if (idx >= this.length) {
            console.log('yes: ', idx, this.length);
            return this.append(value);
        }

        const newNode = this.createNewNode(value)
        const leader = this.traverseToIdx(idx - 1);
        const holdingPointer = leader.next;
        leader.next = newNode;
        newNode.next = holdingPointer;
        this.length++;
        return this.printList();
    }

    // 현재 idx에 해당하는 인덱스의 노드를 찾아줌. 
    traverseToIdx(idx) {
        // Check params
        let counter = 0;
        let currentNode = this.head;
        while(counter !== idx) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    // idx에 해당하는 인덱스에 연결된 노드 제거 (말 그대로 next를 제거할 노드의 next에 연결하면 끝!)
    remove(idx) {
        // Check Parameters
        const leader = this.traverseToIdx(idx - 1);
        const unwantedNode = leader.next;
        leader.next = unwantedNode.next;
        this.length --;
        return this.printList();
    }

    // 새로운 노드를 생성
    createNewNode(value) {
        return {
            value,
            next: null
        }
    }
}

let myLinkedList = new LinkedList(10);console.log(myLinkedList.printList());
myLinkedList.append(5);console.log(myLinkedList.printList());
myLinkedList.append(16);console.log(myLinkedList.printList());
myLinkedList.prepend(1);console.log(myLinkedList.printList());
myLinkedList.insert(2, 99);console.log(myLinkedList.printList());
myLinkedList.insert(20, 88);console.log(myLinkedList.printList());
myLinkedList.remove(2);console.log(myLinkedList.printList());
console.log(myLinkedList.traverseToIdx(3));
console.log(myLinkedList.printList());