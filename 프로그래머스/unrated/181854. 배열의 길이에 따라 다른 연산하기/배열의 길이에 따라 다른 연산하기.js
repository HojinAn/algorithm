function solution(arr, n) {
    return arr.map((el, idx) => (arr.length + idx) % 2 ? el + n : el);
}