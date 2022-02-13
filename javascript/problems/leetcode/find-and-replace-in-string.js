const findReplaceString = (s, indices, sources, targets) => {
  let result = "";

  while (indices.length) {
    const nowIndex = indices.pop();
    const nowSource = sources.pop();
    const nowTarget = targets.pop();

    const nowWord = s.slice(nowIndex, nowIndex + nowSource.length);
    console.log(nowWord);

    result = nowWord === nowSource ? nowTarget + result : nowWord;

    if (indices.length) {
      const nextIndex = indices[indices.length - 1];
      const nextSource = sources[indices.length - 1].length;
      const constantWord = s.slice(nextIndex + nextSource, nowIndex);
      result = constantWord + result;
    }
  }
  return result;
};

(() => {
  const s = "abcd";
  const indices = [0, 2];
  const sources = ["a", "cd"];
  const targets = ["eee", "ffff"];
  console.log(findReplaceString(s, indices, sources, targets));
})();
