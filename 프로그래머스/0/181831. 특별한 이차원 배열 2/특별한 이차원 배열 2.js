function solution(arr) {
    return arr.every((li, r) => li.every((el, c)=> el === arr[c][r])) ? 1 : 0;
}