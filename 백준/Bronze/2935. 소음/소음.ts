import * as fs from 'fs';
const [a, operator, b] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = a.split('').reverse();
const m = b.split('').reverse();
const nLen = n.length;
const mLen = m.length;
const l = Math.max(nLen, mLen);

if (operator === '+') {
  console.log([...Array(l)].map((_, i) => {
    if (n[i] === undefined) n[i] = '0';
    if (m[i] === undefined) m[i] = '0';
    return Number(n[i]) + Number(m[i]);
  }).reverse().join(''));
} else {
  console.log('1' + [...Array(nLen + mLen - 2)].map(() => '0').join(''));
}