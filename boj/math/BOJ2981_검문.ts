import * as fs from 'fs';
const [n, ...numbers] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const gcd = (n: number, m: number) => (!m ? n : gcd(m, n % m));

numbers.sort((a, b) => a - b);
let gcdVal = numbers[1] - numbers[0];
for (let i = 2; i < n; i++) gcdVal = gcd(gcdVal, numbers[i] - numbers[i - 1]);

const ans = <number[]>[];
for (let i = 2; i <= gcdVal; i++) gcdVal % i || ans.push(i);

console.log(ans.join(' '));
