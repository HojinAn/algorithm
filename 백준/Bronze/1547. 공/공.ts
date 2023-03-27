import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const cup = [0, 1, 2, 3];
inp.forEach((s) => {
  const [x, y] = s.trim().split(' ').map(Number);
  [cup[x], cup[y]] = [cup[y], cup[x]];
});

console.log(cup.indexOf(1));
