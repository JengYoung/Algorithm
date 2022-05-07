const check = (result, k) => {
  return result.length === k;
};

const treverseByInOrderUntilK = (node, k, result = []) => {
  if (check(result, k)) {
    return result;
  }

  if (!node.left && !node.right) {
    result.push(node.val);
    return result;
  }

  if (node.left) {
    result = treverseByInOrderUntilK(node.left, k, result);
  }

  if (!check(result, k)) {
    result.push(node.val);
  }

  if (node.right) {
    result = treverseByInOrderUntilK(node.right, k, result);
  }

  return result;
};

const kthSmallest = (root, k) => {
  return treverseByInOrderUntilK(root, k).pop();
};

(() => {
  const root = [3, 1, 4, null, 2];
  const k = 1;

  console.log(kthSmallest(root, k));
})();
