function checkIsEven(a) {
    return !(a % 2);
}
function solution(a, b) {
    if (!checkIsEven(a) && !checkIsEven(b)) {
        return a ** 2 + b ** 2;
    }
    if (checkIsEven(a) && checkIsEven(b)) {
        return Math.abs(a - b);
    }
    return 2 * (a + b);
}