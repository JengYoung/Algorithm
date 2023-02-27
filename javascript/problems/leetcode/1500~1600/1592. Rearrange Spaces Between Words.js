const makeSpaces = (cnt) => Array(cnt).fill(" ").join("");

const reorderSpaces = (text) => {
  let spaceNum = 0;
  let arr = text.split(" ").filter((val) => val);
  let spaceCnt = arr.length - 1;

  for (let i of text) {
    spaceNum += i === " ";
  }

  if (arr.length === 1) return arr[0] + makeSpaces(spaceNum);

  const maximizedSpaceCount = parseInt(spaceNum / spaceCnt);
  const remainder = spaceNum % spaceCnt;

  let result = "";
  for (let i = 0; i < arr.length; i += 1) {
    result +=
      arr[i] + (i !== arr.length - 1 ? makeSpaces(maximizedSpaceCount) : "");
  }

  return result + makeSpaces(remainder);
};
