import * as fs from "fs";
const [n, ...heights] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
console.log(
  heights.reduce(
    ({ stack, cnt }, height, i) => {
      while (stack.length && height >= stack[stack.length - 1][0])
        cnt += i - stack.pop()![1] - 1;
      stack.push([height, i]);
      if (i === n - 1) cnt += stack.reduce((sum, [, el]) => sum + (i - el), 0);
      return { stack, cnt };
    },
    { stack: <number[][]>[], cnt: 0 }
  ).cnt
);
