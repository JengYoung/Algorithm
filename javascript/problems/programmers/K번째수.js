function solution(array, commands) {
    var answer = [];
    commands.forEach(command => {
        const copiedArray = [ ... array ];
        const [ from, to, idx ] = command;
        const splicedArray = copiedArray.splice(from - 1, to - from + 1);
        splicedArray.sort((a, b) => a - b);
        answer.push(splicedArray[idx - 1])
    })
    return answer;
}