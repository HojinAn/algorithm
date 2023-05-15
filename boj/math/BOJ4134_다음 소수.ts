import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

const solution = (numbers: number[]) =>
  numbers.reduce((acc, cur) => {
    while (!isPrime(cur)) cur++;
    acc.push(cur);
    return acc;
  }, <number[]>[]);

console.log(solution(inp.map(Number)).join('\n'));
