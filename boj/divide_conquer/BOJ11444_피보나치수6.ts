import * as fs from 'fs';
const N = BigInt(fs.readFileSync('/dev/stdin').toString());
const DIV = BigInt(1000000007);
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const matA = [
  [ONE, ONE],
  [ONE, ZERO],
];
const multEl = (a: bigint, b: bigint) => (a * b) % DIV;
const sumEl = (a: bigint, b: bigint) => (a + b) % DIV;
const multMat = (
  [[a1, a2], [a3, a4]]: bigint[][],
  [[b1, b2], [b3, b4]]: bigint[][]
) => [
  [
    sumEl(multEl(a1, b1), multEl(a2, b3)),
    sumEl(multEl(a1, b2), multEl(a2, b4)),
  ],
  [
    sumEl(multEl(a3, b1), multEl(a4, b3)),
    sumEl(multEl(a3, b2), multEl(a4, b4)),
  ],
];
const calcMat = (n: bigint, half = n / TWO) => {
  if (n === ONE) return matA;
  const matA2 = calcMat(half);
  return n % TWO
    ? multMat(multMat(matA2, matA2), calcMat(ONE))
    : multMat(matA2, matA2);
};
console.log(Number(calcMat(N)[1][0]));
