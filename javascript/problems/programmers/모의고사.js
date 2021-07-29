function solution(answers) {
    const correctAnswerCount = [null, 0, 0, 0];
    let answer = [];
    let maxCount = 0;
    for (let i = 0; i < answers.length ; i++) {
        if ([1,2,3,4,5][i % 5] === answers[i]) correctAnswerCount[1]++;
        if ([2,1,2,3,2,4,2,5][i % 8] === answers[i]) correctAnswerCount[2]++;
        if ([3,3,1,1,2,2,4,4,5,5][i % 10] === answers[i]) correctAnswerCount[3]++;
    }
    for (let idx = 1; idx < 4; idx++) {
        if (maxCount <= correctAnswerCount[idx]) {
            answer = maxCount === correctAnswerCount[idx] ? answer.concat([idx]) : [idx];
            maxCount = correctAnswerCount[idx];
        }
    }
    return answer;
}

const answers = [1,2,3,4,5];
console.log(solution(answers));