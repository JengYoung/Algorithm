/**
 * 1. 결국 핵심은 조합 문제.
 * [a,b,c,d] => [a, b] [a, c] [a, d] [b, c] [b, d] [c, d]
 */
const comb = (arr, count) => {
  if (count === 1) return arr.map((value) => [value]);

  const combinations = [];

  arr.forEach((value, index) => {
    const nextArr = arr.filter((_, nextIndex) => index < nextIndex);
    const result = comb(nextArr, count - 1).map((res) => [value, ...res]);

    combinations.push(...result);
  });

  return combinations;
};

/**
 * 로우로 묶인 값을 칼럼에 따른 값들로 묶어서 반환한다.
 */
const zip = (...args) => {
  const res = Array.from({ length: args[0].length }, () => []);

  args.forEach((row) => {
    row.forEach((col, colIndex) => {
      res[colIndex].push(col);
    });
  });

  return res;
};

class AlphabetKeyIndexStrategy {
  constructor(indexCount, caseType = 'uppercase') {
    if (indexCount > 26) {
      throw new Error('알파벳 수보다 많습니다.');
    }

    this._indexCount = indexCount;
    this._caseType = caseType;
  }

  run() {
    const indices = Array.from({ length: this._indexCount }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    return this._caseType === 'uppercase'
      ? indices
      : indices.map((v) => v.toLowerCase());
  }
}

class KeyGenerator {
  constructor(num, Strategy = AlphabetKeyIndexStrategy) {
    this.Strategy = new Strategy(num);
  }

  generate() {
    return this.Strategy.run();
  }
}

class Table {
  constructor(rawData, ColumnKeyGenerator = KeyGenerator) {
    this._data = rawData;

    this._ColumnKeyGenerator = new ColumnKeyGenerator(this.colLength);
  }

  get rowLength() {
    return this._data.length;
  }

  get colLength() {
    return this._data?.[0]?.length ?? 0;
  }

  get columnKeys() {
    return this._ColumnKeyGenerator.generate();
  }

  get columns() {
    const dataZip = zip(...this.data);

    return this.columnKeys.reduce(
      (acc, cur, index) => ({
        ...acc,
        [cur]: dataZip[index],
      }),
      {}
    );
  }

  get data() {
    return this._data;
  }
}

const solution = (relations) => {
  const table = new Table(relations);

  return table.columns;
};

console.log(
  solution([
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ])
);
