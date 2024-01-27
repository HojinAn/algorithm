function solution(arr) {
    const diff = arr.length - arr[0].length;
    if (diff > 0) {
        return arr.map((li) => [...li, ...Array(diff).fill(0)]);
    }
    if (diff < 0) {
        return [...arr, ...[...Array(-diff)].map((_) => Array(arr[0].length).fill(0))];
    }
    return arr;
}