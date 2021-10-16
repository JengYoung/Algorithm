const n = 3
const generateParenthesis = n => {
  const arr = Array.from({ length: 9 }, () => [])
  for (let i = 1; i < n + 1; i += 1) {
    if (i === 1) {
      arr[i].push('()');
      continue;
    }
    let nowResult = [];
    arr[i - 1].forEach(brackets => {
      for (let j = 0; j < brackets.length - 1; j += 1) {
        if (brackets[j] === '(') {
          nowResult.push(pushedParenthesis(brackets, j))
          nowResult.push(pushedParenthesis(brackets, j - 1))
        }
      }
    })
    arr[i] = [...new Set(nowResult)]
  }
  return arr[n]
}

const pushedParenthesis = (brackets, idx) => {
  return brackets.slice(0, idx + 1) + '()' + brackets.slice(idx + 1, brackets.length)
}
console.log(generateParenthesis(n))