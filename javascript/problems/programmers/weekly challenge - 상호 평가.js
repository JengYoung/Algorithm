const checkMaxMinValue = (arr, idx) => {
    let result = Array.from (new Array(arr.length), (_, idx) => [idx, idx]); // [최대, 최소]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            const now = arr[i][j];
            const [ maxIdx, minIdx ] = result[j];
            if (i === j) continue;
            if (now >= arr[maxIdx][j]) result[j][0] = i;
            if (now <= arr[minIdx][j]) result[j][1] = i;  
        }
    }
    return result.map(([max, min], idx) => (max === idx || min === idx) ? true : false);
}
const returnScores = arr => {
    return arr.map(value => {
        if (value >= 90) return "A";
        else if (value >= 80) return "B";
        else if (value >= 70) return "C";
        else if (value >= 50) return "D";
        else return "F"
    }).join("")
}
const solution = scores => {
    let answer = Array.from(new Array(scores.length), () => 0);
    let isMyValueMaxMin = checkMaxMinValue(scores);
    let length = scores.length;
    for (let i = 0; i < scores.length; i++) {
        for (let j = 0; j < scores.length; j++) {
            if (isMyValueMaxMin[j]) {
                if (i === j) continue;
                answer[j] += (scores[i][j] / (length - 1))
            } else {
                answer[j] += scores[i][j] / length;
            }
        }
    }
    return returnScores(answer);
}

const scores = [[100,90,98,88,65],[50,45,99,85,77],[47,88,95,80,67],[61,57,100,80,65],[24,90,94,75,65]];
console.log(solution(scores))