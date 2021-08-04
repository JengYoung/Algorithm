/*
    1. 일단 뒤쪽부터 pop을 한다.
    2. s가 무조건 맞다면, 일단 ) 앞에는 언젠가는 (가 무조건 와야 한다.
    3. 또한, 만약 (가 왔는데, )가 없다면 이 역시 틀린 답이다.
    4. 2~3을 만족한다면 올때까지 )가 나온 개수를 센다. 이때 (가 오면 count를 없앤다.
    5. 끝까지 실행. 만약 ) 개수가 0이 아니라면, 틀린 답!
*/ 

/*
    * 제한사항 
    1: 0 < s.length < 100000
    2: s는 '(' 또는 ')'로만 이루어짐. 
*/
const solution = s => {
    // cnt: 현재까지 pop됐지만 괄호를 찾지 못한 ')'의 개수
    let cnt = 0;
    let left = "("
    const sArr = s.split("");
    while(sArr.length) {
        // now: 현재 pop된 괄호.
        const now = sArr.pop();
        if (now === left && cnt === 0) return false;
        now === left ? cnt-- : cnt++;
    }
    return cnt === 0;
}
const s = ')()(';
console.log(solution(s));