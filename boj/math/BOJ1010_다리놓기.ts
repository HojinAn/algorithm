import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dp = [...Array(30)].map(() => Array(30).fill(0));
for (let i = 0; i < 30; i++) (dp[i][i] = 1), (dp[i][0] = 1);
for (let i = 2; i < 30; i++)
  for (let j = 1; j < 30; j++) dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];

const countBridge = ([w, e]: number[]) => dp[e][w];

console.log(
  inp
    .reduce(
      (ans, li) => (
        ans.push(countBridge(li.trim().split(' ').map(Number))), ans
      ),
      <number[]>[]
    )
    .join('\n')
);
