function solution(code) {
    return [...code].reduce(([ret, mode], s, idx) => {
        if (s === '1') {
            return [ret, +(!mode)];
        }
        if ((mode && idx % 2) || (!mode && !(idx % 2))) {
            return [ret + s, mode];
        }
        return [ret, mode];
    }, ['', 0])[0] || 'EMPTY';
}