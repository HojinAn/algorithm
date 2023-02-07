import * as fs from 'fs';

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(S);
const meetings = inp.map((li) => li.trim().split(' ').map(Number));

const dp = [...Array(n)].map(() => [0, 0]);
dp[0][1] = meetings[0][2];

for (let i = 1; i < n; i++)
  (dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0])),
    (dp[i][1] = dp[i - 1][0] + meetings[i][2]);

console.log(Math.max(...dp[n - 1]));
