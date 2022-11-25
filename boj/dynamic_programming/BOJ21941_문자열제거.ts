import * as fs from 'fs';
const [target, _, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const N = target.length;
console.log(
  [...Array(N)]
    .reduce<{ dp: number[]; infos: [string, number][] }>(
      ({ dp, infos }, _, i) => {
        dp[i + 1] = Math.max(dp[i] + 1, dp[i + 1]);
        infos.forEach(([str, score]) => {
          const len = str.length;
          if (str === target.slice(i, i + len)) {
            dp[i + len] = Math.max(dp[i] + score, dp[i + len]);
          }
        });
        return { dp, infos };
      },
      {
        dp: Array(N + 1).fill(0),
        infos: input.map<[string, number]>((el) => {
          const [a, x] = el.trim().split(' ');
          return [a, +x];
        }),
      }
    )
    .dp.pop()
);
