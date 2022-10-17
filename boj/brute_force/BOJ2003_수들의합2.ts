import * as fs from "fs";
const [[n, m], numbers] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let answer = 0;
numbers.forEach((_, i) => {
  let sum = 0;
  for (let j = i; j < n; j++) {
    if (sum < m) sum += numbers[j];
    else {
      if (sum === m) answer++;
      return;
    }
  }
  if (sum === m) answer++;
});
console.log(answer);
