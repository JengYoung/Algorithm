class Queue { 
    constructor(arr){
        this.arr = arr;
    }
    append(val) {
        this.arr.push(val);
    }
    popleft() {
        return this.arr.shift();
    }
    check(now) {
        return (this.arr.filter(val => (val > now)).length === 0)
    }
    getLength() {
        return this.arr.length;
    }
}

const solution = (priorities, location) => {
    let cnt = 0; // 프린트한 문서 카운트.
    const queue = new Queue(priorities);
    
    while (queue.getLength() !== 0) {
        const now = queue.popleft();
        if (queue.check(now)) {
            cnt++;
            if (location === 0) break;
        } 
        else {
            queue.append(now)
        }
        location = (location - 1) >= 0 ? location - 1 : (location - 1 + queue.getLength())
    }
    return cnt;
}

const priorities = [1, 1, 9, 1, 1, 1]
const location = 0

console.log(solution(priorities, location))
