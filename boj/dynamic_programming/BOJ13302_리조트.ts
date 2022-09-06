import * as fs from "fs";
const [[n, m], impossible] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const INF = Number.MAX_SAFE_INTEGER;
const possible = Array(n + 1).fill(true);
if (m) impossible.forEach((el) => (possible[el] = false));
const cps = [0, 10000, 25000, 37000];
const dp = [...Array(n + 1)].map(() => Array(n + 1).fill(-1));

const solve = (day: number, coupon: number) => {
  if (day > n) return 0;
  if (dp[day][coupon] !== -1) return dp[day][coupon];
  if (!possible[day]) return (dp[day][coupon] = solve(day + 1, coupon));
  let ret = INF;
  if (coupon >= 3) ret = Math.min(ret, solve(day + 1, coupon - 3));
  ret = Math.min(
    ret,
    solve(day + 1, coupon) + cps[1],
    solve(day + 3, coupon + 1) + cps[2],
    solve(day + 5, coupon + 2) + cps[3]
  );
  return (dp[day][coupon] = ret);
};

console.log(solve(1, 0));
