const solution = (price, money, count) => {
    const result = 0;
    for (let i = 1; i <= count; i++) {
        result += price * i;
    }
    return money - result;
}
const price = 3;
const money = 20;
const count = 4;

console.log(solution(price, money, count))