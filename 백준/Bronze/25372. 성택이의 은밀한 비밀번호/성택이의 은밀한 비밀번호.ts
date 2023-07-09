import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp
    .map((v) => {
      const l = v.length;
      return l >= 6 && l <= 9 ? 'yes' : 'no';
    })
    .join('\n')
);
