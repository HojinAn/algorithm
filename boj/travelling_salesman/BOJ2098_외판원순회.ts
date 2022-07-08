import * as fs from "fs";
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +input1,
  INF = 1000000000,
  cost = input2.map((el) => el.trim().split(" ").map(Number)),
  dp: number[][] = [...Array(n)].map(() => Array(1 << n).fill(-1));
const travel = (cur: number, visited: number) => {
  if (visited >= (1 << n) - 1) return cost[cur][0] ? cost[cur][0] : INF;
  if (dp[cur][visited] !== -1) return dp[cur][visited];
  let tmp = INF;
  for (let i = 0; i < n; i++)
    cost[cur][i] &&
      !(visited & (1 << i)) &&
      (tmp = Math.min(tmp, travel(i, visited | (1 << i)) + cost[cur][i]));
  return (dp[cur][visited] = tmp);
};
console.log(travel(0, 1));
