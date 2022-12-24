import * as fs from 'fs';
const [n, m] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);
const ZERO = BigInt(0);
const FIVE = BigInt(5);
const TWO = BigInt(2);
const count5 = (n: bigint, cnt = ZERO) => {
  while (n >= 5) cnt += n /= FIVE;
  return cnt;
};
const count2 = (n: bigint, cnt = ZERO) => {
  while (n >= 2) cnt += n /= TWO;
  return cnt;
};
console.log(
  Math.min(
    Number(count2(n) - count2(m) - count2(n - m)),
    Number(count5(n) - count5(m) - count5(n - m))
  )
);
