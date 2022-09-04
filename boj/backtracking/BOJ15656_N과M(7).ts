import * as fs from "fs";
const [[n, m], nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
nums.sort((a, b) => a - b);
const answer: string[] = [];
const repetPermu = (cnt: number, arr: number[]) => {
  if (cnt === m) {
    answer.push(arr.join(" "));
    return;
  }
  for (let i = 0; i < n; i++) repetPermu(cnt + 1, [...arr, nums[i]]);
};
repetPermu(0, []);
console.log(answer.join("\n"));
