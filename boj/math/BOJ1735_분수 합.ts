import * as fs from 'fs';
const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [a1, b1] = s1.trim().split(' ').map(Number);
const [a2, b2] = s2.trim().split(' ').map(Number);

const gcd = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));

const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const solution = (a1: number, b1: number, a2: number, b2: number): void => {
  const denominator = lcm(b1, b2);
  const numerator = (denominator / b1) * a1 + (denominator / b2) * a2;
  const gcdNum = gcd(numerator, denominator);
  console.log(`${numerator / gcdNum} ${denominator / gcdNum}`);
};

solution(a1, b1, a2, b2);
