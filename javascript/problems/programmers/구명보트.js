const solution = (people, limit) => {
    let answer = 0;
    // 정렬
    people.sort((a, b) => a - b)
    while (people.length) {
        const now = people.pop();
        if (now + people[0] <= limit) {
            people.shift();
        }
        answer++;
    }
    return answer
}