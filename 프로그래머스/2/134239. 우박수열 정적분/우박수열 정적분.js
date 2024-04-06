function solution(k, ranges) {
    const generateHailSequence = (no, idx, arr = []) => {
        const seq = [...arr, [idx, no]];
        if (no === 1) {
            return seq;
        }
        const next = no % 2 ? (no * 3 + 1) : no / 2;
        return generateHailSequence(next, idx + 1, seq);
    }

    const hailSeq = generateHailSequence(k, 0);
    const n = hailSeq.length;
    const hailAreas = hailSeq.reduce((areas, [x, y], idx) => {
        if (idx === n - 1) {
            return areas;
        }
        const [min, max] = [y, hailSeq[idx + 1][1]].sort((a, b) => a - b);
        const area = min + (max - min) / 2;
        areas.push(area);
        return areas;
    }, []);

    return ranges.map(([left, r]) => {
        const right = n + r - 1;
        if (right < left) {
            return -1;
        }
        const area = hailAreas.slice(left, right).reduce((acc, no) => acc + no, 0);
        return area;
    });
}