import * as fs from 'fs';

const toNums = (str: string) => str.trim().split(' ').map(Number);

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = toNums(S);
const strSet = new Set<string>();

inp.slice(0, n).forEach((li) => {
  const len = li.length;
  for (let i = 1; i <= len; i++) strSet.add(li.slice(0, i));
});

console.log(
  inp.slice(n).reduce((cnt, str) => cnt + (strSet.has(str) ? 1 : 0), 0)
);
