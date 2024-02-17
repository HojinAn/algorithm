function solution(sequence) {
    return Math.max(
        dp(sequence.map((el, i) => el * ((-1) ** i))),
        dp(sequence.map((el, i) => el * ((-1) ** (i + 1))))
    );
}

function dp(seq) {
    const len = seq.length;
    const dpArr = Array(len).fill(0);
    dpArr[0] = seq[0];
    let max = dpArr[0];
    for (let i = 1; i < len; i++) {
        dpArr[i] = Math.max(seq[i], dpArr[i - 1] + seq[i]);
        max = Math.max(max, dpArr[i]);
    }
    return max;
}