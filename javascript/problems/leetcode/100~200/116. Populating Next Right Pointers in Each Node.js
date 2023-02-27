/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
 var connect = function(root) {
  if (root === null) return root;

  const queue = [];
  queue.push(root);
  
  while (queue.length) {
      const length = queue.length;
      for (let i = 0; i < length; i += 1) {
          // call by reference를 이용하기 위해 다음과 같이 설정하였습니다.
          const node = queue.shift();
          const {val, left, right, next} = node;
          
          if (i !== length - 1) {
              node.next = queue[0]
          }
          
          if (left !== null) {
              queue.push(left)
          }

          if (right !== null) {
              queue.push(right)
          }
      }
  }
  
  return root;
};