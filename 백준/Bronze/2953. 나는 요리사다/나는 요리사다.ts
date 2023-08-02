import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp
    .map((li, i) => {
      const sum = li.trim().split(' ').map(Number).reduce((a, b) => a + b, 0);
      return [i + 1, sum];
    })
    .sort((a, b) => b[1] - a[1])[0]
    .join(' ')
);
