function solution(arrayA, arrayB) {
    const gcdA = arrayA.reduce(gcd);
	const gcdB = arrayB.reduce(gcd);
    const isRightA = checkIsRight(arrayB, gcdA);
    const isRightB = checkIsRight(arrayA, gcdB);
    if (isRightA || isRightB) {
        return Math.max(gcdA, gcdB)
    }
    return 0;
}

function checkIsRight(arr, no) {
    return arr.every((n) => n % no > 0);
}

function gcd(a, b) {
    if (b > 0) {
        return gcd(b, a % b);
    }
    return a;
}