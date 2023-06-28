class Solution {
  List<int> twoSum(List<int> nums, int target) {
    List<int> result = [];

    for (int i = 0; i < nums.length; i++) {
      for (int j = i; j < nums.length; j++) {
        if (i == j) continue;

        if (nums[i] + nums[j] == target) {
          result = [i, j];
        }
      }
    }

    return result;
  }
}
