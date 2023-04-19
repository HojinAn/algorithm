import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString();
const arr = inp
  .trim()
  .split('\n')
  .map((s) => s.trim().split('').reverse());
const n = arr.reduce((max, li) => Math.max(max, li.length), 0);
const ans = <string[]>[];
for (let i = 0; i < n; i++)
  arr.forEach((li) => {
    const s = li.pop();
    if (s) ans.push(s);
  });
console.log(ans.join(''));
