import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp
    .map((li) => {
      const [n, ...arr] = li.trim().split(' ').map(Number);
      const avg = arr.reduce((acc, cur) => acc + cur) / n;
      return (arr.reduce((acc, cur) => acc + (cur > avg ? 1 : 0), 0) * 100) / n;
    })
    .map((v) => `${v.toFixed(3)}%`)
    .join('\n')
);
