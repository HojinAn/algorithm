const operate = (n) => {
    if (n >= 50 && !(n % 2)) {
        return n / 2;
    }
    if (n < 50 && n % 2) {
        return n * 2;
    }
    return n;
};

function solution(arr) {
    return arr.map(operate);
}