import * as fs from "fs";
const [n, m] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(":")
  .map(Number);
const GCD = (n1: number, n2: number) => (!n2 ? n1 : GCD(n2, n1 % n2));
const gcd = GCD(n, m);
console.log([n, m].map((el) => el / gcd).join(":"));
