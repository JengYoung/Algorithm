/**
 * @param {number} capacity
 */
 const LRUCache = function(capacity) {
    this.size = capacity;
    this.recentlyUsedOrder = new Map();
};

/*
    1. 먼저 세팅할 때 size를 만들어주고, 가장 최근의 사용된 걸 알려면 순서를 알아야 하므로 이러한 기능이 있는 Map 객체를 쓴다.
    2. 가져올 때는 map에서 있으면 갖고 오고, 없으면 -1을 리턴.
       이때 중요한 건, 순서를 다시 재배치 시켜야 하므로 삭제시켰다가 다시 세팅해준다.
    3. put의 경우  
*/

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

/*
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
/*
    put 조건이 일단 사이즈가 꽉차면 하나 빼주고
    다시 하나 집어넣어준다.
    1. 하나 빼주는 뭔가가 있어야 돼! -> 반환하는 리턴값
    2. 다시 집어넣어주는 뭔가가 있어야 돼! -> 반환하는 리턴값
*/
LRUCache.prototype.put = function(key, value) {
    //하나 빼주는 뭔가가 있어야 돼!
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