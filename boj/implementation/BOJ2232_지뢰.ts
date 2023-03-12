import * as fs from 'fs';

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +S;

if (n === 1) {
  console.log(1);
} else {
  const powers = inp.map(Number);
  const ans = <number[]>[];
  if (powers[0] >= powers[1]) ans.push(1);
  for (let i = 1; i < n - 1; i++) {
    if (powers[i - 1] <= powers[i] && powers[i] >= powers[i + 1])
      ans.push(i + 1);
  }
  if (powers[n - 1] >= powers[n - 2]) ans.push(n);
  console.log(ans.join('\n'));
}
