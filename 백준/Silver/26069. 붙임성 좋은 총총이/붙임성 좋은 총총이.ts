import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  inp.reduce((set, li) => {
    const [a, b] = li.trim().split(' ');
    if (set.has(a)) set.add(b);
    if (set.has(b)) set.add(a);
    return set;
  }, new Set(['ChongChong'])).size
);
