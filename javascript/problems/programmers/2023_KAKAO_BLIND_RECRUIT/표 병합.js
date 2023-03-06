const EMPTY_CELL_VALUE = 'EMPTY';

class Printer {
  constructor() {
    this.result = [];
  }

  push(value) {
    this.result.push(value);
  }

  print() {
    return this.result;
  }
}

class Table {
  constructor() {
    this._key = 1;

    this._cacheMap = new Map();
    this._table = Array.from({ length: 51 }, () => new Array(51).fill(null));

    this.printer = new Printer();
  }

  get COMMAND_UPDATE() {
    return 'UPDATE';
  }
  get COMMAND_MERGE() {
    return 'MERGE';
  }
  get COMMAND_UNMERGE() {
    return 'UNMERGE';
  }
  get COMMAND_PRINT() {
    return 'PRINT';
  }

  get rowLength() {
    return this._table.length;
  }

  get colLength() {
    return this._table[0].length;
  }

  get key() {
    return this._key;
  }

  updateKey() {
    this._key += 1;
    return this._key;
  }

  update(r, c, value = null) {
    if (value !== null) {
      this.singleUpdate(r, c, value);
    } else {
      this.multipleUpdate(r, c);
    }
  }

  singleUpdate(row, col, value) {
    const key = this._table[row][col] ?? this.updateKey();

    this._table[row][col] = key;
    this._cacheMap.set(key, value);
  }

  multipleUpdate(value1, value2) {
    this._cacheMap.forEach((value, key) => {
      if (value === value1) {
        this._cacheMap.set(key, value2);
      }
    });
  }

  merge(row1, col1, row2, col2) {
    this.tableKey1 = this._table[row1][col1];
    this.tableKey2 = this._table[row2][col2];

    if (row1 === row2 && col1 === col2) {
      return;
    }

    if (this.tableKey1 === null && this.tableKey2 === null) {
      const newKey = this.updateKey();

      this._table[row1][col1] = newKey;
      this._table[row2][col2] = newKey;

      this._cacheMap.set(newKey, null);

      return;
    }

    if (this.tableKey1 === null) {
      this._table[row1][col1] = this.tableKey2;
      return;
    }

    if (this.tableKey2 === null) {
      this._table[row2][col2] = this.tableKey1;
      return;
    }

    const value1 = this._cacheMap.get(this.tableKey1);
    const value2 = this._cacheMap.get(this.tableKey2);

    const nextKey = value1
      ? this.tableKey1
      : value2
      ? this.tableKey2
      : this.tableKey1;

    for (let i = 1; i < this.rowLength; i += 1) {
      for (let j = 1; j < this.colLength; j += 1) {
        if (
          this._table[i][j] === this.tableKey2 ||
          this._table[i][j] === this.tableKey1
        ) {
          this._table[i][j] = nextKey;
        }
      }
    }

    this._cacheMap.delete(nextKey === value1 ? value2 : value1);
  }

  unMerge(r, c) {
    const row = +r;
    const col = +c;

    const key = this._table[row][col];

    if (key === null) return;

    const value = this._cacheMap.get(key);

    for (let i = 1; i < this.rowLength; i += 1) {
      for (let j = 1; j < this.colLength; j += 1) {
        const nowKey = this._table[i][j];

        if (nowKey === key) {
          this._table[i][j] = null;
        }
      }
    }

    this._cacheMap.delete(key);

    const newKey = this.updateKey();
    this._cacheMap.set(newKey, value);

    this._table[row][col] = newKey;
  }

  print(row, col) {
    const key = this._table[row][col];

    this.printer.push(this._cacheMap.get(key) ?? EMPTY_CELL_VALUE);
  }

  getResult() {
    return this.printer.print();
  }
}

function solution(commands) {
  const table = new Table();

  commands.forEach((value) => {
    const [command, ...args] = value.split(' ');

    if (command === table.COMMAND_UPDATE) {
      table.update(...args);
    } else if (command === table.COMMAND_MERGE) {
      table.merge(...args);
    } else if (command === table.COMMAND_UNMERGE) {
      table.unMerge(...args);
    } else if (command === table.COMMAND_PRINT) {
      table.print(...args);
    }
  });

  return table.getResult();
}

{
  console.log(
    solution([
      'UPDATE 1 1 menu',
      'UPDATE 1 2 category',
      'UPDATE 2 1 bibimbap',
      'UPDATE 2 2 korean',
      'UPDATE 2 3 rice',
      'UPDATE 3 1 ramyeon',
      'UPDATE 3 2 korean',
      'UPDATE 3 3 noodle',
      'UPDATE 3 4 instant',
      'UPDATE 4 1 pasta',
      'UPDATE 4 2 italian',
      'UPDATE 4 3 noodle',
      'MERGE 1 2 1 3',
      'MERGE 1 3 1 4',
      'UPDATE korean hansik',
      'UPDATE 1 3 group',
      'UNMERGE 1 4',
      'PRINT 1 3',
      'PRINT 1 4',
    ])
  );
}
