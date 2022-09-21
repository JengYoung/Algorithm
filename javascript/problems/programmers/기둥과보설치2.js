class BuildMap {
  #PILLAR_CODE = 0;
  #FLOOR_CODE = 1;
  #COMMAND_ADD_CODE = 1;
  #COMMAND_DELETE_CODE = 0;

  #BuildTypes = Object.freeze({
    [this.#PILLAR_CODE]: '기둥',
    [this.#FLOOR_CODE]: '보',
  });
  #CommandTypes = Object.freeze({
    [this.#COMMAND_DELETE_CODE]: '삭제',
    [this.#COMMAND_ADD_CODE]: '추가',
  });

  constructor(n) {
    this.mapSize = n + 1;
    this.arr = Array.from(
      { length: this.mapSize },
      () => Array.from({ length: this.mapSize }, () => [false, false]) // pillar, floor(now -> right)
    );
  }

  checkBuild(x, y, buildType, commandType) {
    const commands = {
      [this.#CommandTypes[this.#COMMAND_DELETE_CODE]]: {
        [this.#BuildTypes[this.#PILLAR_CODE]]:
          this.checkDeletePillarPossible.bind(this),
        [this.#BuildTypes[this.#FLOOR_CODE]]:
          this.checkDeleteFloorPossible.bind(this),
      },
      [this.#CommandTypes[this.#COMMAND_ADD_CODE]]: {
        [this.#BuildTypes[this.#PILLAR_CODE]]:
          this.checkAddPillarPossible.bind(this),
        [this.#BuildTypes[this.#FLOOR_CODE]]:
          this.checkAddFloorPossible.bind(this),
      },
    };

    return commands[commandType][buildType](x, y);
  }

  isValidPillar(x, y) {
    if (x < 0) return false;
    if (y < 0) return false;

    if (y === 0) return true;

    // 한쪽 보 끝에 위치할 경우
    if (x > 0 && this.arr[x - 1][y][1]) return true;
    if (this.arr[x][y][1]) return true;

    // 다른 기둥 위에 있을 경우
    if (this.arr[x][y - 1][0]) return true;

    return false;
  }

  isValidFloor(x, y) {
    if (x < 0 || x >= this.mapSize - 1) return false;
    if (y < 0) return false;

    // 한쪽 끝 부분이 기둥 위에 있는 경우
    if (this.arr[x][y - 1][0]) return true;
    if (this.arr[x + 1][y - 1][0]) return true;

    // 다른 보와 동시에 연결되어 있을 경우
    if (x && this.arr[x - 1][y][1] && this.arr[x + 1][y][1]) return true;

    return false;
  }

  checkAddPillarPossible(x, y) {
    if (this.arr[x][y][0]) return false;

    this.arr[x][y][0] = true;

    const result = this.isValidPillar(x, y);

    this.arr[x][y][0] = false;

    return result;
  }

  checkAddFloorPossible(x, y) {
    if (this.arr[x][y][1]) return false;

    this.arr[x][y][1] = true;

    const result = this.isValidFloor(x, y);

    this.arr[x][y][1] = false;

    return result;
  }

  delete(x, y, buildCode) {
    this.arr[x][y][buildCode] = false;
  }

  backupBeforeDelete(x, y, buildCode) {
    this.arr[x][y][buildCode] = true;
  }

  checkDeletePillarPossible(x, y) {
    if (!this.arr[x][y][0]) return false;

    this.delete(x, y, 0);

    // pillar
    // 내 위에 기둥이 있을 경우.
    const overPillarStandPossible =
      y + 1 < this.mapSize &&
      (!this.arr[x][y + 1][0] || this.isValidPillar(x, y + 1));

    // 위쪽의 보가 없거나, 지탱할 만한 뭔가가 있어야 한다.
    const nowOverFloorStandPossible =
      y + 1 < this.mapSize &&
      (!this.arr[x][y + 1][1] || this.isValidFloor(x, y + 1));

    // 왼쪽 보도 없거나, 버틸 수만 있다면 가능.
    const nowOverLeftFloorStandPossible =
      x - 1 >= 0 &&
      y + 1 < this.mapSize &&
      (!this.arr[x - 1][y + 1][1] || this.isValidFloor(x - 1, y + 1));

    const result =
      overPillarStandPossible &&
      nowOverFloorStandPossible &&
      nowOverLeftFloorStandPossible;

    this.backupBeforeDelete(x, y, 0);

    return result;
  }

  checkDeleteFloorPossible(x, y) {
    if (!this.arr[x][y][1]) return false;

    this.delete(x, y, 1);

    // floor
    // 만약 현재 위치에 기둥이 있다면 유효한지 체크
    const isPillarStandPossible =
      !this.arr[x][y][0] || this.isValidPillar(x, y);

    // 현재의 오른쪽에 세워진 기둥도 유효한지 체크.
    const isRightPillarStandPossible =
      x + 1 < this.mapSize &&
      (!this.arr[x + 1][y][0] || this.isValidPillar(x + 1, y));

    // 현재의 왼쪽 보도 유효한지 체크
    const isLeftFloorStandPossible =
      x - 1 >= 0 && (!this.arr[x - 1][y][1] || this.isValidFloor(x - 1, y));

    // 현재의 오른쪽 보도 유효한지 체크
    const isRightFloorStandPossible =
      x + 1 < this.mapSize &&
      (!this.arr[x + 1][y][1] || this.isValidFloor(x + 1, y));

    const result =
      isPillarStandPossible &&
      isRightPillarStandPossible &&
      isLeftFloorStandPossible &&
      isRightFloorStandPossible;

    this.backupBeforeDelete(x, y, 1);

    return result;
  }

  updateBuildMap(x, y, buildCode, commandCode) {
    // 0 = delete => false, 1 = add => true
    this.arr[x][y][buildCode] = !!commandCode;
  }

  render(buildFrame) {
    buildFrame.forEach((command) => {
      const [x, y, buildCode, commandCode] = command;

      if (
        this.checkBuild(
          x,
          y,
          this.#BuildTypes[buildCode],
          this.#CommandTypes[commandCode]
        )
      ) {
        this.updateBuildMap(x, y, buildCode, commandCode);
      }
    });
  }

  getFinalBuildMaterials() {
    const buildMaterials = [];

    for (let i = 0; i < this.mapSize; i += 1) {
      for (let j = 0; j < this.mapSize; j += 1) {
        for (let buildCode = 0; buildCode < 2; buildCode += 1) {
          if (this.arr[i][j][buildCode]) {
            buildMaterials.push([i, j, buildCode]);
          }
        }
      }
    }

    return buildMaterials;
  }
}

const solution = (n, buildFrame) => {
  const buildMap = new BuildMap(n);
  buildMap.render(buildFrame);

  return buildMap.getFinalBuildMaterials();
};

(() => {
  const n = 5;
  const build_frame = [
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [2, 1, 0, 1],
    [2, 2, 1, 1],
    [5, 0, 0, 1],
    [5, 1, 0, 1],
    [4, 2, 1, 1],
    [3, 2, 1, 1],
  ];
  console.log(solution(n, build_frame));
})();

(() => {
  const n = 5;
  const build_frame = [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ];
  console.log(solution(n, build_frame));
})();
