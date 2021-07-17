function solution(arr) {
    const answer = []
    arr.forEach(value => {
        const now = answer[answer.length - 1]
        if (value !== now) answer.push(value)
    })
    return answer
}