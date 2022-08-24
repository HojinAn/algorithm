import * as fs from "fs";
const [n, ...nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const ansArr: string[] = [];
let answer = "";
const dfs = (
  cur: number,
  limit: number,
  arr: string[],
  acc: number,
  prevSum: number
) => {
  if (cur === limit) {
    if (!(acc + prevSum)) ansArr.push(arr.join(""));
    return;
  }
  dfs(cur + 1, limit, [...arr, "+", "" + (cur + 1)], acc + prevSum, cur + 1);
  dfs(cur + 1, limit, [...arr, "-", "" + (cur + 1)], acc + prevSum, -cur - 1);
  dfs(
    cur + 1,
    limit,
    [...arr, " ", "" + (cur + 1)],
    acc,
    prevSum >= 0 ? prevSum * 10 + cur + 1 : prevSum * 10 - cur - 1
  );
};
const findZero = (num: number) => {
  dfs(1, num, ["1"], 0, 1);
};
nums.forEach((el) => {
  findZero(el);
  ansArr.sort().reverse();
  while (ansArr.length) answer += `${ansArr.pop()}\n`;
  answer += "\n";
});
console.log(answer.trim());
