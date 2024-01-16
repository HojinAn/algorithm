const op = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b
};

function solution(binomial) {
    const [a, o, b] = binomial.split(" ");
    return op[o](+a, +b);
}