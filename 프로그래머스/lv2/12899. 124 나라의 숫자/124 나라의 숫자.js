function solution(n) {
    const pair = [4, 1, 2];
    const ans = [];
    while (n > 0) {
        ans.push(pair[n % 3]);
        n = Math.floor((n - 1) / 3);
    }
	return ans.reverse().join('');
}