import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getRemainder = ([p, q]: number[], dp = [0, 1, 1]) => {
  if (p < 3) return dp[p] % q;
  for (let i = 3; i <= p; i++) dp[i] = (dp[i - 1] + dp[i - 2]) % q;
  return dp[p];
};

console.log(
  inp
    .reduce((ans, li, i) => {
      ans.push(
        `Case #${i + 1}: ${getRemainder(li.trim().split(' ').map(Number))}`
      );
      return ans;
    }, <string[]>[])
    .join('\n')
);
