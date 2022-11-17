import * as fs from 'fs';
const [X, Y, W, s] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);
const S = Math.min(2 * W, s);
const W2 = Math.min(W * 2, s * 2);
const [max, min] = [Math.max(X, Y), Math.min(X, Y)];
console.log(S * min + W2 * Math.floor((max - min) / 2) + W * ((max - min) % 2));
