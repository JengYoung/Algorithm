/**
 * @param {number} length
 */

var SnapshotArray = function (length) {
  this.obj = {};
  this.snapshotArr = [];
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  this.obj[index] = val;
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  return this.snapshotArr.push({ ...this.obj }) - 1;
};

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  return this.snapshotArr[snap_id][index] || 0;
};
