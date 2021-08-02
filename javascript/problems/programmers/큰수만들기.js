function getMaxValue(number, from, to) {
    console.log(from, to)
    let max = 0;
    for(let i= from; i < to; i++) {
        if (i > number.length - 1) continue;
        if (number[i] === 9) return 9;
        max = max > number[i] ? max : number[i] 
    }
    return max;
}

const solution = (number, k) => {
    let answer = "";
    let numberArr = number.split("").map(value => parseInt(value));
    let lastIdx = 0;
    while(k !== 0) {
        if (numberArr.length === k) return answer;
        const maxValue = getMaxValue(numberArr, lastIdx, k+1);
        let maxValueIdx = numberArr.indexOf(maxValue);
        k -= maxValueIdx;
        answer += maxValue;
        numberArr.splice(0, maxValueIdx + 1);
    }
    return answer + numberArr.join("") ;
}

// 시간 초과
// function getMaxValueIndex(number, from, to) {
//     let maxIndex = from;
//     for(let i= from; i < Math.min(to, number.length); i++) {
//         if (number.charAt(i) === 9) return i;
//         if (number.charAt(maxIndex) < number.charAt(i)) maxIndex = i;
//     }
//     return maxIndex;
// }

// const solution = (number, k) => {
//     let answer = "";
//     let nowIdx = 0;
//     let removeCount = k;
//     while(true) {
//         if (number.length - nowIdx === removeCount) return answer;
//         const maxValueIndex = getMaxValueIndex(number, nowIdx, nowIdx + removeCount + 1);
//         answer += number.charAt(maxValueIndex);
//         nowIdx = maxValueIndex + 1;
//         removeCount = k - (nowIdx - answer.length);
//     }
// }

const number = "93219321";
const k = 4;

console.log(solution(number, k))