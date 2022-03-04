/**
 * @param {number[]} nums
 */
 var Solution = function(nums) {
    this.nums = [...nums];
    this.originalNums = [...nums];
    
    return this;
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.originalNums;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    const { floor, random } = Math;
    
    for (let i = 0; i < this.nums.length; i += 1) {
        const randomIndex = floor(random()  * this.nums.length);
        [this.nums[i], this.nums[randomIndex]] = [this.nums[randomIndex], this.nums[i]]
    }
    
    return this.nums
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */