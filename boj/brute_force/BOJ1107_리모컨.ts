import * as fs from "fs";
const [[n], [m], broken] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.trim().split(" ").map(Number)),
  remocon: boolean[] = Array(10).fill(true);
broken?.forEach((el) => (remocon[el] = false));

let answer = Math.abs(n - 100);
const possible = (n: number, cnt: number) =>
  !remocon[n % 10]
    ? [false, cnt]
    : n < 10
    ? [true, cnt]
    : possible(Math.floor(n / 10), cnt + 1);

for (let i = 0; i < 1000000; i++) {
  const [bool, cnt] = possible(i, 1);
  bool && (answer = Math.min(answer, cnt + Math.abs(n - i)));
}
console.log(answer);
