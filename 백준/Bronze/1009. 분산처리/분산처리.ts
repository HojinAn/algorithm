import * as fs from 'fs';
const file = fs.readFileSync('/dev/stdin');
const [, ...tc] = file
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(' ').map(Number));
const MOD = 10;
console.log(
  tc
    .map(([a, b]) => {
      let no = a % MOD;
      for (let i = 1; i < b; i++) no = (no * a) % MOD;
      return no || 10;
    })
    .join('\n')
);
