function solution(arr) {
    let i = 0;
    while (2 ** i < arr.length) {
        i++;
    }
    while (arr.length < 2 ** i) {
        arr.push(0);
    }
    return arr;
}