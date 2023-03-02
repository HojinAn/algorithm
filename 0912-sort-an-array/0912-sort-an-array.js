/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    const merge = (arrA, arrB) => {
        const sorted = [];
        let i = 0;
        let j = 0;
        const n = arrA.length;
        const m = arrB.length;
        while (i < n && j < m) {
            const [a, b] = [arrA[i], arrB[j]];
            a < b ? (sorted.push(a), i++) :(sorted.push(b), j++);
        }
        while (i < n) sorted.push(arrA[i++]);
        while (j < m) sorted.push(arrB[j++]);
        return sorted;
    }

    const mergeSort = (arr, n = arr.length) => {
        if (n <= 1) return arr;
        const mid = Math.floor(n / 2);
        const left = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));
        return merge(left, right);
    }
    
    return mergeSort(nums);
};