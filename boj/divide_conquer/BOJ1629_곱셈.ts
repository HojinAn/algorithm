import * as fs from "fs";
const [a, b, c] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);

const bigint2 = BigInt(2),
  bigint1 = BigInt(1);

const pow = (a: bigint, exp: bigint) => {
  if (exp === bigint1) return a % c;
  const child: bigint = pow(a, exp / bigint2);
  return exp % bigint2 === bigint1
    ? (((child * child) % c) * a) % c
    : (child * child) % c;
};

console.log(Number(pow(a, b)));
