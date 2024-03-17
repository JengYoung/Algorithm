var MinStack = function () {
  this.value = [];
  this.min = null;
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.min = Math.min(this.min ?? Number.MAX_SAFE_INTEGER, val);

  const nextValue = {
    value: val,
    min: this.min,
  };

  this.value.push(nextValue);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.value.pop();
  this.min = this.value.at(-1)?.min ?? null;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.value.at(-1).value;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.value.at(-1).min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
