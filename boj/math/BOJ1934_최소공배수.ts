import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const gcd = (n: number, m: number) => (!m ? n : gcd(m, n % m));
console.log(
  inp
    .reduce((ans, li) => {
      const [n, m] = li
        .trim()
        .split(' ')
        .map(Number)
        .sort((a, b) => b - a);
      ans.push((n * m) / gcd(n, m));
      return ans;
    }, <number[]>[])
    .join('\n')
);
