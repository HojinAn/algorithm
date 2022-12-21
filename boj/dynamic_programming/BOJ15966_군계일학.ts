import * as fs from 'fs';
const [, inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp
    .trim()
    .split(' ')
    .map(Number)
    .reduce(
      ({ dp, ans }, num) => (
        ((dp[num] = Math.max(dp[num - 1] + 1, 1)),
        (ans = Math.max(ans, dp[num]))),
        { dp, ans }
      ),
      { dp: Array(1000001).fill(0), ans: 0 }
    ).ans
);
