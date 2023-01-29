import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

const STAR = '*';
const BLANK = ' ';
const NEW_LINE = '\n';
const MAX_LENGTH = 4 * n - 3;

const stars = [...Array(MAX_LENGTH)].map(() => Array(MAX_LENGTH).fill(BLANK));

const makeStars = (start: number, len: number) => {
  for (let i = start; i < len; i++) {
    stars[start][i] = STAR;
    stars[len - 1][i] = STAR;
    stars[i][start] = STAR;
    stars[i][len - 1] = STAR;
  }
  if (len === 1) return;
  makeStars(start + 2, len - 2);
};
makeStars(0, MAX_LENGTH);
console.log(stars.map((li) => li.join('')).join(NEW_LINE));
