function solution(a, b, c, d) {
    const counter = [a, b, c, d].reduce((counter, no) => ({ ...counter, [no]: (counter[no] ?? 0) + 1}), {});
	const pairs = Object.entries(counter).sort(([a1, b1], [a2, b2]) => b2 - b1);
    const len = pairs.length;
    if (len === 1) {
        return (+pairs[0][0]) * 1111;
    }
    if (len === 4) {
        return Math.min(...pairs.map(([k]) => +k));
    }
    if (len === 2) {
        const [[s1, m1], [s2, m2]] = pairs;
        const [n1, n2] = [s1, s2].map(Number);
        if (m1 === m2) {
            return (n1 + n2) * Math.abs(n1 - n2);
        }
        return (10 * n1 + n2) ** 2;
    }
    return pairs.reduce((ans, [k, v]) => {
        if (v === 1) {
            return ans * (+k);
        }
        return ans;
    }, 1);
}