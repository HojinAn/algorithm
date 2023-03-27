function solution(dots) {
    const checkIsParallel = (a, b) => {
        const unselected = [];
        for (let i = 0; i < 4; i++) if (i !== a && i !== b) unselected.push(i);
        const [c, d] = unselected;
        return Math.abs(dots[a][0] - dots[b][0]) * Math.abs(dots[c][1] - dots[d][1]) === Math.abs(dots[a][1] - dots[b][1]) * Math.abs(dots[c][0] - dots[d][0]);
    }
    
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            if (checkIsParallel(i, j)) return 1;
        }
    }
    return 0;
}