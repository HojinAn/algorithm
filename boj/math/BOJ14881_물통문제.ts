import * as fs from "fs";
const [[T], ...cases] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const answer: string[] = [];

const gcd = (a: number, b: number) => (!b ? a : gcd(b, a % b));
const succeedMaking = (arr: number[]) => {
  let [a, b, c] = arr;
  a < b && ([a, b] = [b, a]);
  return (c > a && c > b) || c % gcd(a, b) > 0 ? "NO" : "YES";
};

for (let i = 0; i < T; i++) answer.push(succeedMaking(cases[i]));

console.log(answer.join("\n"));
