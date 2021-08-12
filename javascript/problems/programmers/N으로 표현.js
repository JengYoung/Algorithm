
/**
 * 1. 결국 8개까지의 경우를 따지는 것!
 * 2. 그렇다면 생각을 해보자. 결국 1개라는 것은 0개에서 1개를 추가했다는 것이다.(N)
 * 3. 2개는 단순히 NN으로 표현됐거나, 혹은 1개의 연산 결과 + 1개의 연산 결과
 * 4. 3개는 NNN이거나, 1개 결과 + 2개의 결과일 경우다.
 * 5. 4개는 NNNN, 1개 결과 + 3개 결과, 2개 결과 + 2개 결과이다.
 * 6. 이를 통해 유추해본다면... 현재 연산에 사용된 N의 개수를 cnt라 할 때
 *    i개의 결과 + cnt - i의 결과들의 집합이라 할 수 있다.
 * 7. 코드로 쓴다. Are you ready?
 */

const solution = (N, number) => {
    const nCountArr = Array.from(new Array(9), (value, idx) => idx === 0 ? new Set() :  new Set([parseInt(`${N}`.repeat(idx))]));
    for(let i = 1; i < 9; i++) {
        for (let j = 1; j < i; j++) {
            for (const value of nCountArr[j]) {
                for (const anotherValue of nCountArr[i-j]) {
                    nCountArr[i].add(value + anotherValue);
                    if (value - anotherValue > 0) {
                        nCountArr[i].add(value - anotherValue);
                    }
                    if (value * anotherValue <= number * N) {
                        nCountArr[i].add(value * anotherValue);
                    }
                    if ((value % anotherValue) === 0) {
                        nCountArr[i].add(value / anotherValue);
                    }
                }
            }
        }
        if (nCountArr[i].has(number)) return i;
    }
    return -1;
}
const N = 5;
const number = 12;
console.log(solution(N, number));