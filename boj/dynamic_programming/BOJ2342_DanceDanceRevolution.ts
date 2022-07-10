import * as fs from "fs";
const [input] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const DDR = input.trim().split(" ").map(Number);
DDR.pop();
const n = DDR.length,
  dp: number[][][] = [...Array(5)].map(() =>
    [...Array(5)].map(() => Array(n).fill(-1))
  );
const getEnergy = (from: number, to: number) => {
  if (!from) return 2;
  const diff = Math.abs(from - to);
  if (!diff) return 1;
  else if (diff === 2) return 4;
  else return 3;
};
const solve = (l: number, r: number, cnt: number) => {
  if (cnt === n) return 0;
  if (dp[l][r][cnt] > -1) return dp[l][r][cnt];
  return (dp[l][r][cnt] = Math.min(
    solve(DDR[cnt], r, cnt + 1) + getEnergy(l, DDR[cnt]),
    solve(l, DDR[cnt], cnt + 1) + getEnergy(r, DDR[cnt])
  ));
};
console.log(solve(0, 0, 0));
