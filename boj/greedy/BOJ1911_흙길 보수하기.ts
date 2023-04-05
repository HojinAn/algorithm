import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [, l] = S.trim().split(' ').map(Number);

let prev = 0;
console.log(
  inp
    .map((li) => li.trim().split(' ').map(Number))
    .sort(([af, at], [bf, bt]) => (af === bf ? at - bt : af - bf))
    .reduce((cnt, [s, e]) => {
      const lLimit = Math.max(s, prev);
      const diff = e - lLimit;
      const toAdd = Math.ceil(diff / l);
      cnt += toAdd;
      prev = lLimit + toAdd * l;
      return cnt;
    }, 0)
);
