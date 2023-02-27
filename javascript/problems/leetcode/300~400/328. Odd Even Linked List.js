function oddEvenList(arr) {
  for (let value of genList()) {
    console.log(value);
  }

  function* genList() {
    let idx = 0;

    while (idx < arr.length) {
      yield arr[idx];
      idx += 2;
    }
  }

  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(oddEvenList(arr));
