import * as fs from "fs";
const [n1, n2] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number),
  GCD = (n1: number, n2: number) => (!n2 ? n1 : GCD(n2, n1 % n2)),
  gcd = GCD(n1, n2);
console.log(`${gcd}\n${(n1 * n2) / gcd}`);
