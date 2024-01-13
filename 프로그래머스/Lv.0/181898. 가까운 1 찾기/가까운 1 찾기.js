function solution(arr, idx) {
    const dIdx = arr.slice(idx).findIndex((x) => x === 1);
    return dIdx === -1 ? -1 : dIdx + idx;
}