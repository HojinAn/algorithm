import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const numbers = inp.map(Number).sort((a, b) => a - b);

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const solution = (numbers: number[]) => {
  const diff = numbers.slice(1).map((v, i) => v - numbers[i]);
  const min = diff.reduce((acc, cur) => gcd(acc, cur));
  const answer = diff.reduce((acc, cur) => acc + cur / min - 1, 0);
  console.log(answer);
};

solution(numbers);
