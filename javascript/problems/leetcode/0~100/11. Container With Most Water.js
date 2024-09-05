/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxValue = 0;

  const getVolume = (row, col) => {
    return row * col;
  };

  let left = 0;
  let right = height.length - 1;

  while (right > left) {
    const leftHeight = height[left];
    const rightHeight = height[right];

    const row = right - left;

    const volume = getVolume(row, Math.min(leftHeight, rightHeight));

    if (volume > maxValue) {
      maxValue = volume;
    }

    if (leftHeight > rightHeight) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return maxValue;
};
