const getMinBalancedBracketInfo = (n) => {
  let left = 0;
  let right = 0;

  let isCorrect = true;

  let i = 0;
  while (left !== right || !i) {
    if (n[i] === "(") left += 1;
    else right += 1;
    if (left < right) isCorrect = false;
    i += 1;
  }

  return [i, isCorrect];
};

const solution = (n) => {
  if (!n.length) return "";
  const [balancedBracketLength, isCorrect] = getMinBalancedBracketInfo(n);
  let [u, v] = [
    n.slice(0, balancedBracketLength),
    n.slice(balancedBracketLength),
  ];

  let result = isCorrect
    ? u + solution(v)
    : "(" +
      solution(v) +
      ")" +
      u
        .slice(1, u.length - 1)
        .split("")
        .map((val) => (val === "(" ? ")" : "("))
        .join("");

  return result;
};
