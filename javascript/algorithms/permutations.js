/**
 * 
 * ! 순열
 * n개 중에서 m개를 뽑을 때, 순서를 고려하여 계산하는 것!
 * ex) 1,2,3,4와 4,3,2,1은 다르기 때문에 계산 결과에 각자 포함.
 * nCm * m!
 * 
 * * 현재, 재귀를 이용하여 구현하였다.
 * 
 */

function permutations(arr, num) {
    const resArr = [];
    // num이 1개이면 배열을 값으로 갖는 2차원 배열로 리턴
    if (num === 1) return arr.map(val => [val]);

    arr.forEach((now, idx) => {
        // 여기서는 현재 인덱스를 제외한, 배열을 필터로 뽑아냄.
        const excludeNowArr = arr.filter((each, eachIdx) => idx !== eachIdx);

        // 재귀함수를 통해서, now를 제외한 배열 속에서 m - 1개의 배열을 고르는 배열을 뽑아냄.
        const pArr = permutations(excludeNowArr, num - 1);

        // 결과적으로 2차원 배열이 생성되면, 처음에 제외했던 값을 합침.
        const result = pArr.map(each => [now, ...each]);

        // 현재 2차원 배열이므로, 각 배열을 푸시시킬 수 있도록 spread 연산자 이용.
        resArr.push(...result);
    })
    return resArr
}

const test = [1,2,3,4];
const result = permutations(test, 3);
console.log(result)