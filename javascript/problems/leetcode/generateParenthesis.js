const n = 3
const generateParenthesis = n => {
  const arr = Array.from({ length: 9 }, () => [])
  for (let i = 1; i < n + 1; i += 1) {
    if (i === 1) {
      arr[i].push('()');
      continue;
    }
    let brackets = getBrackets(arr[i - 1]);
    arr[i] = [...new Set(brackets)]
  }
  return arr[n]
}

const getBrackets = (arr) => {
  let result = [];
  arr.forEach(brackets => {
    for (let j = 0; j < brackets.length - 1; j += 1) {
      if (brackets[j] === '(') {
        result.push(pushedParenthesis(brackets, j))
        result.push(pushedParenthesis(brackets, j - 1))
      }
    }
  })
  return result;
}

const pushedParenthesis = (brackets, idx) => {
  return brackets.slice(0, idx + 1) + '()' + brackets.slice(idx + 1, brackets.length)
}
console.log(generateParenthesis(n))