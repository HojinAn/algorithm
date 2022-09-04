import * as fs from "fs";
const [[n, m], nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const ans = new Set<string>();
nums.sort((a, b) => a - b);
const repetCombi = (
  cnt: number,
  start: number,
  arr: number[],
  visited: number
) => {
  if (cnt === m) {
    ans.add(arr.join(" "));
    return;
  }
  for (let i = start; i < n; i++)
    if (!(visited & (1 << i)))
      repetCombi(cnt + 1, i, [...arr, nums[i]], visited | (1 << i));
};
repetCombi(0, 0, [], 0);
console.log(Array.from(ans).join("\n"));
