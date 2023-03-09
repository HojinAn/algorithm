function solution(arr) {
    const n = arr.length;
    
    const ans = [0, 0];
    
    const checkAllSame = (r, c, len, el = arr[r][c]) => {
        for (let i = r; i < r + len; i++)
            for (let j = c; j < c + len; j++)
                if (el !== arr[i][j]) return false;

        return true;
    }
    
    const divide = (r, c, len, el = arr[r][c]) => {
        if (len === 1) {
            ans[el]++;
            return;
        }
    	if (checkAllSame(r, c, len)) {
			ans[el]++;
            return;
        }
        const half = len >> 1;
		divide(r, c, half);
        divide(r + half, c, half);
        divide(r, c + half, half);
        divide(r + half, c + half, half);
    }
    
	divide(0, 0, n);
    return ans;
}