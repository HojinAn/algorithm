function solution(p) {
    if (p === '') return p;
    
    const LEFT = '(';
    const RIGHT = ')';
    
    const checkIsRight = (str) => {
        const {length} = str;
        const pair = [0, 0];
        for (let i = 0; i < length; i++) {
           	const s = p[i];
            if (s === LEFT) pair[0]++;
            else pair[1]++;
            if (pair[1] > pair[0]) return false;
        }
        return true;
    }
    
    const pair = [0, 0];
    for (let i = 0; i < p.length; i++) {
        const s = p[i]
		if (s === LEFT) pair[0]++;
        else pair[1]++;
        if (pair[0] === pair[1]) {
            const u = p.slice(0, i + 1);
            const v = p.slice(i + 1);
            if (checkIsRight(u)) return u + solution(v);
            else {
                let ret = LEFT;
                ret += solution(v);
                ret += RIGHT;
                for (let j = 1; j < i; j++) ret += p[j] === LEFT ? RIGHT : LEFT;
                return ret;
            }
        }
    }
}