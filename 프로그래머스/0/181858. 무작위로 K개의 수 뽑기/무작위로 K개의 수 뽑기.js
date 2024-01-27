function solution(arr, k) {
    const set = new Set(arr);
    if (set.size >= k) {
        return [...set.values()].slice(0, k);
    }
    return [...set.values(), ...Array(k - set.size).fill(-1)];
}