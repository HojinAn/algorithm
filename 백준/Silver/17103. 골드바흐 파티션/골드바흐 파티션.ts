import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const numbers = inp.map(Number);

const isPrime = (n: number) => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

const primeSet = [...Array(1000001)].reduce(
  (set, _, i) => (isPrime(i) ? set.add(i) : set),
  new Set<number>()
);

const primeNumbers = Array.from<number>(primeSet);

const solution = (numbers: number[]) => {
  return numbers.map((n) => {
    let cnt = 0;
    for (const p of primeNumbers) {
      if (p > n / 2) break;
      if (primeSet.has(n - p)) cnt++;
    }
    return cnt;
  });
};

console.log(solution(numbers).join('\n'));
