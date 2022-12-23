import * as fs from 'fs';
const [[n], [r1st, ...radii]] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(' ').map(Number));
const gcd = ([n, m]: number[]) => (!m ? n : gcd([m, n % m]));
console.log(
  radii
    .reduce((ans, r) => {
      const mcd = gcd([r1st, r].sort((a, b) => b - a));
      ans.push([r1st / mcd, r / mcd].join('/'));
      return ans;
    }, <string[]>[])
    .join('\n')
);
