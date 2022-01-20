function solution(s)
{
    var answer = 0;
    let sArr = [...s];

    while(sArr.length) {
        let nextArr = [];
        for (let i = 0; i < sArr.length; i += 1) {
            const now = sArr[i];
            if (nextArr[nextArr.length - 1] === now) {
                nextArr.pop();
            } else {
                nextArr.push(now)
            }
        }
        
        if (sArr.length === nextArr.length) return answer;
        sArr = nextArr
    }
    
    answer = 1;
    return answer;
}
