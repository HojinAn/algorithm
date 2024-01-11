function sum(acc, n) {
    return acc + n;
}
function solution(arr1, arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    if (len1 === len2) {
		const sum1 = arr1.reduce(sum);
        const sum2 = arr2.reduce(sum);
        if (sum1 === sum2) {
            return 0;
        }
        return sum1 > sum2 ? 1 : -1;
    }
    return len1 > len2 ? 1 : -1;
}