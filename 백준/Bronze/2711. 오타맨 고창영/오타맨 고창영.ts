import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp
    .map((li) => {
      const [i, s] = li.trim().split(' ');
      const n = +i - 1;
      const strs = s.trim().split('');
      strs.splice(n, 1);
      return strs.join('');
    })
    .join('\n')
);
