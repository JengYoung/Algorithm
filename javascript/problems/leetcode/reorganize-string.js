class MinHeap {
  constructor() {
    this.heap = [null];
  }
  heappush(val) {
    this.heap.push(val);
    let nowIdx = this.heap.length - 1;
    let parentIdx = this.updateParentIdx(nowIdx);

    while (nowIdx > 1 && this.heap[nowIdx][1] < this.heap[parentIdx][1]) {
      nowIdx = parentIdx;
      parentIdx = this.updateParentIdx(nowIdx);
    }
  }

  heappop() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();
    const min = this.heap[1];
    this.heap[1] = this.heap.pop();

    let [nowIdx, leftIdx, rightIdx] = this.updateIndices(1);

    if (!leftIdx) return min;
    if (!rightIdx) {
      if (this.heap[nowIdx][1] > this.heap[leftIdx][1]) {
        this.swap(nowIdx, leftIdx);
        return min;
      }
    }

    while (
      this.heap[leftIdx] !== undefined &&
      this.heap[rightIdx] !== undefined &&
      Math.min(this.heap[leftIdx][1], this.heap[rightIdx][1]) <
        this.heap[nowIdx]
    ) {
      const minIdx =
        this.heap[leftIdx][1] < this.heap[rightIdx][1] ? leftIdx : rightIdx;

      this.swap(nowIdx, minIdx);
      [nowIdx, leftIdx, rightIdx] = this.updateIndices(minIdx);
    }

    return min;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  updateParentIdx(idx) {
    return Math.floor(idx / 2);
  }
  updateIndices(idx) {
    return [idx, idx * 2, idx * 2 + 1];
  }
  size() {
    return this.heap.length - 1;
  }
}

const reorganizeString = (s) => {
  const minHeap = new MinHeap();
  const counts = {};
  const splitedS = [...s];

  splitedS.forEach((val, idx) => {
    if (val === splitedS[idx - 1]) {
      counts[val] = (counts[val] ?? 0) + 1;
      splitedS[idx - 1] = "";
    }
  });

  Object.entries(counts).forEach((cntArr) => {
    minHeap.heappush([...cntArr, false]);
  });

  let arrangedS = [...splitedS.join("")];
  let lastS = [...arrangedS];

  while (minHeap.size()) {
    let [now, cnt, isSecond] = minHeap.heappop();

    if (JSON.stringify(arrangedS) === JSON.stringify(lastS) && isSecond)
      return "";
    lastS = [...arrangedS];
    for (let i = 0; i < arrangedS.length; i += 1) {
      if (!cnt) continue;
      if (arrangedS[i] !== now) {
        if (!i || arrangedS[i - 1] !== now) {
          arrangedS[i] = now + arrangedS[i];
          cnt -= 1;
        } else if (i === arrangedS.length - 1) {
          arrangedS[i] += now;
          cnt -= 1;
        }
      }
    }
    arrangedS = [...arrangedS.join("")];
    if (cnt) {
      minHeap.heappush([now, cnt, true]);
    }
  }

  return arrangedS.join("");
};

const s = "vvvlo";
console.log(reorganizeString(s));
