import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const score = [100, 100];

const compare = ([x, y]: number[]) => {
  if (x === y) return;
  if (x < y) {
    score[0] -= y;
    return;
  }
  score[1] -= x;
};

inp.forEach((s) => {
  const dice = s.trim().split(' ').map(Number);
  compare(dice);
});

console.log(score.join('\n'));
