import * as fs from 'fs';

const [s1, s2, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = Number(s1);
const m = Number(s2);
const plans = inp
  .map((li) => li.trim().split(' ').map(Number))
  .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
const cache = Array(m).fill(-1);

const dp = (ith: number) => {
  if (ith === m) return 0;
  if (cache[ith] !== -1) return cache[ith];
  cache[ith] = n;
  const [, to] = plans[ith];
  for (let i = ith + 1; i < m; i++) {
    const [s] = plans[i];
    if (s <= to) continue;
    cache[ith] = Math.min(cache[ith], Math.max(s - to - 1, dp(i)));
  }
  return (cache[ith] = Math.min(cache[ith], n - to));
};

console.log(
  plans.reduce((min, [s], i) => Math.min(min, Math.max(s - 1, dp(i))), n)
);
