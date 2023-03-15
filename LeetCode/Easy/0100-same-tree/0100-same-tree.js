/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    if (!p.left && !q.left && !p.right && !q.right) return true;
    if (p.left && q.left && !p.right && !q.right) return isSameTree(p.left, q.left);
    if (!p.left && !q.left && p.right && q.right) return isSameTree(p.right, q.right);
    if (p.left && q.left && p.right && q.right) return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    return false;
};