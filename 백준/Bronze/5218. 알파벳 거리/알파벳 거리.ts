import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const result = inp
  .map((str) => {
    const [a, b] = str.split(' ');
    const arrA = a.split('');
    const arrB = b.split('');
    const result = arrA.map((v, i) => {
      const diff = arrB[i].charCodeAt(0) - v.charCodeAt(0);
      return diff >= 0 ? diff : diff + 26;
    });
    return `Distances: ${result.join(' ')}`;
  })
  .join('\n');

console.log(result);
