import * as fs from "fs";
const [, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
console.log(
  inp.reduce(
    ({ stack, cnt }, s) => {
      const height = +s,
        next = [height, 1];
      while (stack.length && stack[stack.length - 1][0] <= height) {
        const pop = stack.pop()!;
        cnt += pop[1];
        if (height === pop[0]) next[1] += pop[1];
      }
      if (stack.length) cnt++;
      stack.push(next);
      return { stack, cnt };
    },
    { stack: <number[][]>[], cnt: 0 }
  ).cnt
);
