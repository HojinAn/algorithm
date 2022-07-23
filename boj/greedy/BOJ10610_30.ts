import * as fs from "fs";
const nums = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("")
  .map(Number)
  .sort((a, b) => b - a);
if (nums[nums.length - 1] || nums.reduce((acc, cur) => acc + cur) % 3)
  console.log("-1");
else console.log(nums.join(""));
