function solution(sticker) {
  const stickerLength = sticker.length;
  if (stickerLength === 1) return sticker[0];
  if (stickerLength === 2) return Math.max(...sticker);
  const startDp = new Array(stickerLength - 1).fill(0);
  const endDp = new Array(stickerLength - 1).fill(0);
  for (let i = 0; i < stickerLength - 1; i += 1) {
    const checkStartIndex = i;
    const checkEndIndex = i + 1;
    if (i < 2) {
      startDp[i] = !i
        ? sticker[checkStartIndex]
        : Math.max(sticker[checkStartIndex - 1], sticker[checkStartIndex]);
      endDp[i] = !i
        ? sticker[checkEndIndex]
        : Math.max(sticker[checkEndIndex - 1], sticker[checkEndIndex]);
      continue;
    }
    startDp[i] = Math.max(
      sticker[checkStartIndex] + startDp[i - 2],
      startDp[i - 1]
    );
    endDp[i] = Math.max(sticker[checkEndIndex] + endDp[i - 2], endDp[i - 1]);
  }
  return Math.max(startDp[stickerLength - 2], endDp[stickerLength - 2]);
}
