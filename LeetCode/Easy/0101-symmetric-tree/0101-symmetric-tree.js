/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
    const {left, right} = root;
    if (!left && !right) return true;
    if (left && right) return isSymmetricSubtree(left, right);
    return false;
};

function isSymmetricSubtree(lRoot, rRoot) {
    if (!lRoot || !rRoot) return lRoot === rRoot;
    if (lRoot?.val !== rRoot?.val) return false;
    return isSymmetricSubtree(lRoot.right, rRoot.left) && isSymmetricSubtree(lRoot.left, rRoot.right);
}