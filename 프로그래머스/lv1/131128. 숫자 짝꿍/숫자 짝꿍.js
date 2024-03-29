function solution(X, Y) {
    const countReducer = (counter, s) => counter.set(s, (counter.get(s) ?? 0) + 1);
    const counterX = X.split('').reduce(countReducer, new Map());
    const counterY = Y.split('').reduce(countReducer, new Map());
    
    const ans = [];
    for (const [s, val] of counterX) {
        const cnt = Math.min(val, (counterY.get(s) ?? 0));
		cnt && ans.push(s.repeat(cnt));
    }
    
    ans.sort().reverse();
    let str = ans.join('');
    if (str[0] === '0') str = '0';
    return ans.length ? str : '-1';
}