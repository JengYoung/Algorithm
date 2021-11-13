# 네트워크

문제의 핵심은 간단하다. 
> 그래서, 지금 여러 개를 묶었을 때, 몇 개의 네트워크로 묶이는 것인가? 

이에 대한 문제를 bfs로 풀 수도 있을 것이다. 하지만 union-find로 풀려 한다.  
완전 탐색보다 훨씬 빠른 O(n)의 시간 복잡도로 충분히 해결할 수 있는 알고리즘이기 때문이다.  

## 문제 풀이 과정

처음 문제를 떠올렸을 때 다음과 같은 해결 방법이 떠올랐다. 
1. 결국 묶음이 몇 개인지를 센다면, 루트 노드의 개수로 충분히 셀 수 있다.
2. 따라서 `union-find`만으로도 주어진 해를 구할 수 있다. 
3. 행 / 열을 쭉 돌 때, 만약 1이 있다면, 부모 루트를 비교하여 작은 쪽으로 업데이트 해준다.
4. 이를 반복하다 보면, 결국 다음과 같이 된다.
   - 인덱스가 바뀐 루트: 부모에게 종속이 된 것이다.
   - 인덱스가 바뀌지 않은 루트: 바뀌지 않았다는 것은 곧 부모에게 속한다는 것이다. 
따라서, 이를 filter을 통해 `parent`의 인덱스가 변하지 않은 루트를 비교하고, 그 답을 구하면 된다.
```js

const findParent = (x, parent) => {
  return parent[x] === x ? x : findParent(parent[x], parent);
};

const updateParent = (a, b, parent) => {
  const parentA = findParent(a, parent);
  const parentB = findParent(b, parent);
  if (parentA < parentB) parent[parentB] = parent[parentA];
  if (parentB < parentA) parent[parentA] = parent[parentB];
};

const solution = (n, computers) => {
  const parent = Array.from({ length: n }, (_, idx) => idx);
  computers.forEach((arr, rowIdx) => {
    arr.forEach((value, colIdx) => {
      if (rowIdx === colIdx) return;
      if (value) updateParent(rowIdx, colIdx, parent);
    });
  });

  return parent.filter((val,idx) => val === idx).length;
};
```
