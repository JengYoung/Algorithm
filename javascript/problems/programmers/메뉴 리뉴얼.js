/**
 * [1,2,3,4,5]
 * 1 -> [2,3,4,5]
 *   -> [1, 2] -> [[3],[4],[5]]
 *   -> [1, 3] -> [4,5]
 *   -> [1, 4] -> [5]
 *   -> [1, 5] -> []
 * 2 -> [3,4,5]
 * 3 -> [4,5]
 * 4 -> [5]
 * @param {string[]} menus
 * @param {number} count
 * @param {string[][]} res
 */
//  * 1. 각 주문한 단품메뉴들의 하위 조합들을 course 단위에 맞게 구한다.
const getCombinations = (menus, count) => {
  const result = [];

  if (count <= 1) {
    return menus.map((v) => [v]);
  }

  menus.forEach((now, nowIndex) => {
    const restMenus = menus.filter((_, idx) => idx > nowIndex);

    const restCombinations = getCombinations(restMenus, count - 1, result);

    const res = restCombinations.map((v) => [now].concat(v));

    result.push(...res);
  });

  return result;
};

/**
 * 1. 각 주문한 단품메뉴들의 하위 조합들을 course 단위에 맞게 구한다.
 *
 * 2. 이때, 결과값의 조합은 항상 오름차순을 정렬해야 하므로 정렬을 먼저 실시하고 구한다.
 *
 * 3. 구한 하위 조합단위들의 수를 등록하는 map을 구현한다.
 *
 * 4. map에서 각 키는 서브조합의 이름, 값은 개수로 한다.
 *
 * 5. 1에서 구현한 하위 조합들을 순회하며 map을 업데이트한다.
 *
 * 6. map을 순회하며 가장 많이 호출된 코스를 배열에 담는다.
 *
 * 7. 결과를 오름차순에 맞게 정렬한다.
 */

const solution = (orders, course) => {
  // 3. 구한 하위 조합단위들의 수를 등록하는 map을 구현한다.
  const menuCache = new Map();
  const result = new Map();

  course.forEach((c) => {
    result.set(c, { courses: [], count: 0 });
  });

  orders.forEach((order) => {
    course.forEach((c) => {
      // 2. 이때, 결과값의 조합은 항상 오름차순을 정렬해야 하므로 정렬을 먼저 실시하고 구한다.
      const combinations = getCombinations([...order].sort(), c);

      combinations.forEach((combination) => {
        const now = combination.join('');

        menuCache.set(now, (menuCache.get(now) ?? 0) + 1);
      });
    });
  });

  menuCache.forEach((count, menu) => {
    const courseSize = menu.length;

    const nowResult = result.get(courseSize);

    if (count > 2 && count === nowResult.count) {
      nowResult.courses.push(menu);
      return;
    }
    if (count > 2 && count > nowResult.count) {
      result.set(courseSize, { courses: [menu], count: count });
      return;
    }
  });

  return [...result.values()]
    .map(({ courses }) => courses)
    .flat()
    .sort();
};

(() => {
  const orders = ['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'];
  const course = [2, 3, 4];
  console.log(solution(orders, course)); // ["AC", "ACDE", "BCFG", "CDE"]
})();

// (() => {
//   const orders = ['XYZ', 'XWY', 'WXA'];
//   const course = [2, 3, 4];
//   console.log(solution(orders, course)); // ["AC", "ACDE", "BCFG", "CDE"]
// })();
