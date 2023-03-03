function solution(number, limit, power) {
    const cntDivisor = (no, divSet = new Set()) => {
        for (let i = 1; i * i <= no; i++) if (no % i === 0) divSet.add(i).add(no/i);
        return divSet.size;
    }
    let ans = 0;
    for (let i = 1; i <= number; i++) {
		const cnt = cntDivisor(i);
		ans += cnt > limit ? power : cnt;
    }
    return ans;
}