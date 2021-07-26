class Queue {
    constructor(arr) {
        this.arr = arr;
    }
    append(val) {
        this.arr.push(val);
    }
    popleft() {
        return this.arr.shift();
    }
    getLength() {
        return this.arr.length;
    }
    getWeight() {
        if (this.arr.length === 0) return 0;
        return this.arr.reduce((acc, cur) => acc + cur[0], 0)
        
    }
    setTime(time) {
        if (this.arr.length === 0) return;
        this.arr.forEach(truck => {
            truck[1] += time;
        })
    }
    checkArrived(length) {
        if (this.arr.length === 0) return;
        if (this.arr[0][1] === length) this.popleft()
    }
    getArrivalTime(length, time) {
        return length - time;
    }
    print() {
        return this.arr
    }
    // 다리의 무게가 다음 트럭이 들어올 때까지 큐를 빼내고 시간을 계산한다.
    setTruckArrivedTime(length, time) {
        const [now, remainingTime] = this.popleft();
        const cost = this.getArrivalTime(length, remainingTime);
        time += cost;
        this.setTime(cost);
        return time;
    }
}

const solution = (bridge_length, weight, truck_weights) => {
    let time =  0;
    const queue = new Queue(truck_weights);
    const bridgeQueue = new Queue([]);
    while (queue.getLength() !== 0) {
        const now_truck_weight = queue.popleft();
        time++;
        bridgeQueue.setTime(1);
        bridgeQueue.checkArrived(bridge_length);

        if (bridgeQueue.getWeight() + now_truck_weight <= weight) {
            bridgeQueue.append([now_truck_weight, 0])
        } else {
            // 다리에 트럭이 올라갈 수 있을 때까지 큐를 빼내고 시간을 측정
            while (bridgeQueue.getWeight() + now_truck_weight > weight) {
                time = bridgeQueue.setTruckArrivedTime(bridge_length, time)
            }
            bridgeQueue.append([now_truck_weight, 0]);
        }
        console.log(bridgeQueue, time)
    }
    while (bridgeQueue.getLength()) {
        time = bridgeQueue.setTruckArrivedTime(bridge_length, time)
    }
    return time;
}

const bridge_length = 5
const weight = 5
const truck_weights = [2, 2, 2, 2, 1, 1, 1, 1, 1]
console.log(solution(bridge_length, weight, truck_weights))
