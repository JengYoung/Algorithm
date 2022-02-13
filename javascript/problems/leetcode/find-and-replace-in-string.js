const zipArrs = (indices, sources, targets) => {
  const arr = Array(indices.length).fill([]);
  return arr.map((_, i) => [indices[i], sources[i], targets[i]]);
};

const findReplaceString = (s, indices, sources, targets) => {
  let result = "";
  const infos = zipArrs(indices, sources, targets);
  const infosLength = infos.length;

  infos.sort((a, b) => a[0] - b[0]);

  let start = infos[0][0] !== 0 ? s.slice(0, infos[0][0]) : "";
  let end =
    infos[infosLength - 1][0] + infos[infosLength - 1][1].length !==
    infosLength - 1
      ? s.slice(infos[infosLength - 1][0] + infos[infosLength - 1][1].length)
      : "";

  while (infos.length) {
    const [nowIndex, nowSource, nowTarget] = infos.pop();

    const nowWord = s.slice(nowIndex, nowIndex + nowSource.length);

    result = nowWord === nowSource ? nowTarget + result : nowWord + result;

    if (infos.length) {
      const [nextIndex, nextSource, _] = infos[infos.length - 1];
      const constantWord = s.slice(nextIndex + nextSource.length, nowIndex);
      result = constantWord + result;
    }
  }
  return start + result + end;
};

(() => {
  const s = "abcd";
  const indices = [0, 2];
  const sources = ["a", "cd"];
  const targets = ["eee", "ffff"];
  console.log(findReplaceString(s, indices, sources, targets));
})();

(() => {
  const s = "vmokgggqzp";
  const indices = [3, 5, 1];
  const sources = ["kg", "ggq", "mo"];
  const targets = ["s", "so", "bfr"];
  console.log(findReplaceString(s, indices, sources, targets));
})();

(() => {
  const s = "jjievdtjfb";
  const indices = [4, 6, 1];
  const sources = ["md", "tjgb", "jf"];
  const targets = ["foe", "oov", "e"];
  console.log(findReplaceString(s, indices, sources, targets));
})();
