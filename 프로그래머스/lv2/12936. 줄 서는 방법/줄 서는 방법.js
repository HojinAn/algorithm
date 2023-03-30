function solution(n, k) {
    const numbers = [...Array(n)].map((_, i) => i + 1);
    const factoCache = Array(n).fill(0);
    
    const facto = (n) => {
        if (n < 2) return (factoCache[n] = n);
        if (factoCache[n]) return factoCache[n];
        return (factoCache[n] = n * facto(n - 1));
    }
    
    facto(n);
    factoCache[0] = 1;
    
    const getNumbers = (d, no, visited, acc = []) => {
        if (!d) return acc;
        
        let cnt = 0;
        const idx = Math.floor(no / factoCache[d - 1]);
		for (let i = 0; i < n; i++) {
            if (visited & 1 << i) continue;
            if (cnt === idx) {
                acc.push(i + 1);
                visited |= 1 << i;
                break;
            }
            cnt++;
        }
        
        return getNumbers(d - 1, no % factoCache[d - 1], visited, acc);
    }
    
    return getNumbers(n, k - 1, 0);
}