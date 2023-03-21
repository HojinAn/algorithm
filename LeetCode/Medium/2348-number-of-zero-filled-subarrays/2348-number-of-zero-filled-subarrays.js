/**
 * @param {number[]} nums
 * @return {number}
 */
function zeroFilledSubarray(nums) {
    const n = nums.length;
    
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (!nums[i]) {
            i++;
            let cnt = 1;
            while (i < n && !nums[i]) cnt++, i++;
            ans.push(cnt);
            i < n && i--;
        }
    }
    
    return ans.reduce((cnt, no) => cnt + (no*(no+1)/2), 0);
};