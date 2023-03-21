import * as fs from 'fs';

const toNums = (s: string) => s.trim().split(' ').map(Number);

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = toNums(S);
const ans = inp.reduce((ans, s) => {
  const [f, t, k] = toNums(s);
  for (let i = f - 1; i < t; i++) ans[i] = k;
  return ans;
}, Array(n).fill(0));

console.log(ans.join(' '));
