import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(
  inp.map((li) => (!(+li[li.length - 1] % 2) ? 'even' : 'odd')).join('\n')
);
