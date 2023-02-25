import * as fs from 'fs';

const ZERO = BigInt(0);
const ONE = BigInt(1);

const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(s1);
const numbers = s2.trim().split(' ').map(Number);
const last = numbers.pop()!;
const cache = [...Array(n)].map<bigint[]>(() => Array(21).fill(ZERO));

cache[0][numbers[0]] = ONE;

numbers.forEach((number, ith) => {
  ith &&
    cache[ith - 1].forEach((el, idx) => {
      if (el > ZERO) {
        idx + number <= 20 && (cache[ith][idx + number] += el);
        idx - number >= 0 && (cache[ith][idx - number] += el);
      }
    });
});

console.log(`${cache[n - 2][last]}`);
