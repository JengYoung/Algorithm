const solution = (n, times) => {
    times.sort((a, b) => a - b);
    let [ left, right ] = [ 1, times[0] * n ];
    let result = right;
    while(left <= right) {
        let nowCount = 0;
        let mid = Math.floor((left + right) / 2);
        times.forEach(time => {
            nowCount += Math.floor(mid / time)
            if (nowCount >= n) result = Math.min(result, mid);
        });
        if (nowCount < n) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}
const n = 6;
const times = [7, 10];

console.log(solution(n, times))