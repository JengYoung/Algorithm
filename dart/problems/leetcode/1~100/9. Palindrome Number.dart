class Solution {
  bool isPalindrome(int x) {
    String strX = x.toString();
    String reversedStrX = strX.split('').reversed.join('');

    return strX == reversedStrX;
  }
}
