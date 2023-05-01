import * as fs from 'fs';
const [a, b, c] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
if (a + b + c !== 180) console.log('Error');
else if (a === b && b === c) console.log('Equilateral');
else if (a === b || b === c || c === a) console.log('Isosceles');
else console.log('Scalene');
