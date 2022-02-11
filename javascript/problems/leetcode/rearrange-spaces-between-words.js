/**
 * @param {string} text
 * @return {string}
 */
var reorderSpaces = function (text) {
  let spaceCnt = 0;
  let arr = text.split(" ").filter((val) => val);
  for (let i of text) {
    if (i === " ") spaceCnt += 1;
  }
  if (arr.length === 1) return arr[0] + Array(spaceCnt).fill(" ").join("");

  const maximizedSpaceCount = parseInt(spaceCnt / (arr.length - 1));
  const remainder = spaceCnt % (arr.length - 1);

  let result = "";
  for (let i = 0; i < arr.length; i += 1) {
    result += arr[i];
    if (i !== arr.length - 1)
      result += Array(maximizedSpaceCount).fill(" ").join("");
  }

  return result + (remainder ? Array(remainder).fill(" ").join("") : "");
};
