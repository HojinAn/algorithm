import * as fs from 'fs';
const str = fs.readFileSync('/dev/stdin').toString();
const n = +str;

console.log(
  [...Array(n)]
    .map((_, i) =>
      [...Array(n - i - 1).fill(' '), '*', ...Array(i).fill(' *')].join('')
    )
    .join('\n')
);
