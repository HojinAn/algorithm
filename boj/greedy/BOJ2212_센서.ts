import * as fs from "fs";
const [[n], [k], sensors] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
console.log(
  sensors
    .sort((a, b) => a - b)
    .reduce(
      (diffArr, el, i, arr) =>
        i === n - 1 ? diffArr : diffArr.concat(arr[i + 1] - el),
      <number[]>[]
    )
    .sort((a, b) => a - b)
    .reduce((ans, el, i) => (ans += i < n - k ? el : 0), 0)
);
