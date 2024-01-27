function solution(arr) {
    return operateArr(arr);
}

function calc(n) {
    if (n >= 50 && !(n % 2)) {
        return n / 2;
    }
    if (n < 50 && n % 2) {
        return n * 2 + 1;
    }
    return n;
}

function operateArr(arr1, n = 0) {
    const arr2 = arr1.map(calc);
    if (arrayEquals(arr1, arr2)) {
        return n;
    }
    return operateArr(arr2, n + 1);
}

function arrayEquals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((el, i) => el === arr2[i]);
}