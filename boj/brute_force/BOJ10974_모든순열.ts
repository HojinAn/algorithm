import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();
const numbers = [0];
let answer = "";
const permu = (no: number, depth: number, visited: number) => {
  if (depth === n) {
    answer += `${numbers.join(" ")}\n`;
    return;
  }
  for (let i = 0; i < n; i++)
    if (!((1 << i) & visited))
      (numbers[depth] = i + 1), permu(i, depth + 1, visited | (1 << i));
};
permu(0, 0, 0);
console.log(answer.trim());
