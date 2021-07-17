class Queue {
    constructor(arr) {
        this.arr = arr;
    }
    append(val) {
        this.arr.push(val);
    }
    pop(val) {
        return this.arr.pop();
    }
    appendLeft(val) {
        this.arr.unshift(val);
    }
    popleft() {
        return this.arr.shift();
    }
    getLength() {
        return this.arr.length;
    }
}

function solution(progresses, speeds) {
    const arr = progresses.map((progress, idx) => [progress, speeds[idx]]);

    const queue = new Queue(arr);
    let day = 0;
    const answer = [];
    let res = [];
    while (true) {
        const [progress, speed] = queue.popleft();
        const nowProgress = progress + (day * speed);
        if (nowProgress < 100) {
            if (res.length > 0) answer.push(res.length);
            res = [];
            const remainder = (100 - nowProgress) % speed;
            const quotient = (100 - nowProgress - remainder) / speed;
            remainder ? day += quotient + 1 : day += quotient; 
            res.push(progress);
        } else {
            res.push(progress);
        }

        // break
        if (!queue.getLength()) {
            answer.push(res.length);
            break;
        }
    }
    return answer
}

const progresses = [95, 90, 99, 99, 80, 99]	
const speeds = [1, 1, 1, 1, 1, 1]
console.log(solution(progresses, speeds))