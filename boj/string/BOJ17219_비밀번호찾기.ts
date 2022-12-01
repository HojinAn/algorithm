import * as fs from "fs";
const [str1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n] = str1.trim().split(" ").map(Number);

let idx = 0;
const sitePWmap = new Map();
input.slice(idx, (idx += n)).forEach((el) => {
  const [k, v] = el.trim().split(" ");
  sitePWmap.set(k, v);
});
console.log(
  input
    .slice(idx)
    .reduce((answer, k) => {
      answer.push(sitePWmap.get(k));
      return answer;
    }, <string[]>[])
    .join("\n")
);
