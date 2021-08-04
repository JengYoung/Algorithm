class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
};


class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    find(value) {
        let currNode = this.head;
        while (currNode.value !== value) {
            currNode = currNode.next;
        }
        return currNode;
    }
    append(newValue) {
        const newNode = new Node(newValue);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    insert(node, newValue) {
        const newNode = new Node(newValue);
        // 새로운 노드의 다음은 이제 끼워넣기 전의 next를 인계받아야 함.
        newNode.next = node.next;
        // 그리고 끼워넣을 곳의 앞쪽 노드는 새로운 노드를 next로 가리키게 함.
        node.next = newNode;
    }
    remove(value) {
        let prevNode = this.head;
        while (prevNode.next.value !== value) {
            prevNode = prevNode.next;
        }
        if (prevNode.next !== null) {
            prevNode.next = prevNode.next.next;
        }
    }
    display() {
        let currNode = this.head;
        let displayString = "[";
        while (currNode !== null) {
            displayString += `${currNode.value}, `;
            currNode = currNode.next;
        }
        displayString = displayString.substr(0, displayString.length - 2);
        displayString += "]";
        console.log(displayString);
    }
    size() {
        let currNode = this.head;
        let cnt = 0;
        while(currNode !== null) {
            currNode = currNode.next;
            cnt++;
        }
        return cnt;
    }
}


const linkedList = new SinglyLinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(5);
linkedList.display();
console.log(linkedList.size())
console.log(linkedList.find(3))
linkedList.remove(3);
linkedList.display();
console.log(linkedList.size())
linkedList.insert(linkedList.find(2), 10);
linkedList.display();
console.log(linkedList.size())