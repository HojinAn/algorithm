import * as fs from "fs";
const [[n], nums, operators] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let answer = [-1000000001, 1000000001];

const calc = (depth: number, val: number, ops: number[]) => {
  if (depth >= n) {
    answer[0] = Math.max(val, answer[0]);
    answer[1] = Math.min(val, answer[1]);
    return;
  }
  const next = nums[depth];
  for (let i = 0; i < 4; i++) {
    const arr = [...ops];
    if (arr[i]) {
      arr[i]--;
      switch (i) {
        case 0:
          calc(depth + 1, val + next, arr);
          break;
        case 1:
          calc(depth + 1, val - next, arr);
          break;
        case 2:
          calc(depth + 1, val * next, arr);
          break;
        case 3:
          const no = val / next;
          calc(depth + 1, no < 0 ? Math.ceil(no) : Math.floor(no), arr);
          break;
      }
    }
  }
};

calc(1, nums[0], operators);

console.log(answer.join("\n"));
