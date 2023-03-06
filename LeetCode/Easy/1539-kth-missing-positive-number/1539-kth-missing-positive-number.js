/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
function findKthPositive (arr, k) {
    const existSet = new Set(arr);
    const ans = [];
    let no = 1;
    while(ans.length < k) {
        if (!existSet.has(no)) ans.push(no)
        no++;
    }
    return ans[k - 1];
};