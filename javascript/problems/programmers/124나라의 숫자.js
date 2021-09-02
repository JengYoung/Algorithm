
const get124CountryNumber = (n, res = [], num = [4, 1, 2]) => {
  if (!n) return res;
  res = (n % 3 === 0) 
    ? [...get124CountryNumber(parseInt((n - 1) / 3), res), num[n % 3]] // 3으로 나눠질 때 나머지가 0이 되는 것들.
    : [...get124CountryNumber(parseInt(n / 3), res), num[n % 3]]
  return res;
}

const solution = n => {
  return get124CountryNumber(n)
}
const n = 24;
console.log(solution(n))
