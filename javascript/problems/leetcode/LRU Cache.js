/**
 * @param {number} capacity
 */
 const LRUCache = function(capacity) {
    this.size = capacity;
    this.recentlyUsedOrder = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const value = this.recentlyUsedOrder.get(key);
    if (value === undefined) return -1;

    this.recentlyUsedOrder.delete(key);
    this.recentlyUsedOrder.set(key, value);
    return value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.recentlyUsedOrder.get(key) === undefined && this.recentlyUsedOrder.size === this.size) {
        const iter = this.recentlyUsedOrder[Symbol.iterator]();
        const next = iter.next();
        this.recentlyUsedOrder.delete(next.value[0]);
    }
    this.recentlyUsedOrder.delete(key);
    this.recentlyUsedOrder.set(key, value);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4