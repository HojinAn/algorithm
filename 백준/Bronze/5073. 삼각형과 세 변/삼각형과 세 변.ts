import * as fs from 'fs';
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
inp.pop();

const EQU = 'Equilateral';
const ISO = 'Isosceles';
const SCALE = 'Scalene';
const INVALID = 'Invalid';

const checkTriangle = (acc: string[], str: string) => {
  const [a, b, c] = str.trim().split(' ').map(Number);
  return acc.concat(
    a >= b + c || b >= a + c || c >= a + b
      ? INVALID
      : a === b && b === c
      ? EQU
      : a === b || b === c || c === a
      ? ISO
      : SCALE
  );
};

console.log(inp.reduce<string[]>(checkTriangle, []).join('\n'));
