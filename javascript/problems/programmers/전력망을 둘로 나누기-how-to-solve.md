## 풀이 과정

1. 핵심은 기존의 '트리'가 '두 개의 트리'로 나눠진다는 것이다.
2. 그렇다면 트리의 개수를 비교한다는 것은 '하나의 트리 개수'만 알아도 충분히 추론할 수 있다.
3. 따라서 하나의 트리를 기준으로 찾는 로직을 구상했다.
4. 먼저 `start`할 노드를 선택하고, 양방향 그래프를 구현한다.
5. 각 간선마다 제거된 형태의 그래프를 추출해내고, `bfs`를 통해 노드 방문 여부를 체크한다.
6. 결과적으로 필터를 통해 해당 트리의 노드 개수를 구할 수 있다.
7. 이를 `minValue`와 비교해서, 결과적으로 가장 작은 차이일 때의 `minValue` 값을 구한다.
