// 핵심은 가장 두 개 선과 인덱스 차이.
const maxArea = height => {
  let start = 0;
  let end = height.length - 1;
  let maxArea = 0;
  while (start <= end) {
    const nowStartHeight = height[start];
    const nowEndHeight = height[end];
    let nowMaxArea = getArea(nowStartHeight, nowEndHeight);
    if (maxArea < nowMaxArea) maxArea = nowMaxArea;
    if (nowStartHeight < nowEndHeight) start += 1;
    else end -= 1;
  }
  function getArea(startHeight, endHeight) {
    return Math.min(startHeight, endHeight) * (end - start);
  }
  return maxArea
}

(() => {
  const height = [1,8,6,2,5,4,8,3,7];
  console.log(maxArea(height));
})();

(() => {
  const height = [1,2,3,4,5,25,24,3,4]
  console.log(maxArea(height));
})()