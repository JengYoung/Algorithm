/*
  문제가 간단하기보다는 로직이 간단하여 md 작성 없이 설명을 주석으로 진행합니다.
  1. 맨 처음에 모든 문자를 다 소문자로 변환
  2. 띄어쓰기 기준으로 배열로 변환한다.
  3. 조건에 맞춰 정렬을 진행한다. (길이가 짧은 것 -> 원래 순서)
  4. 맨 앞 문자만 대문자로 변환
  5. 다시 문자열을 합침
*/

const arrangeWords = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .sort((a, b) => (a.length !== b.length ? a.length - b.length : 0))
    .map((val, idx) => (idx ? val : val[0].toUpperCase() + val.slice(1)))
    .join(" ");
};

const text = "Keep calm and code on";

console.log(arrangeWords(text));
