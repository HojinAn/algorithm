import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const MOD = BigInt(1000000007);
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);

const power = (no: bigint, exp = MOD - TWO): bigint => {
  if (exp <= ONE) return BigInt(Math.pow(Number(no), Number(exp)));
  const powNo = power(no, exp / TWO);
  return exp % TWO === ONE
    ? (((no * powNo) % MOD) * powNo) % MOD
    : (powNo * powNo) % MOD;
};
const solve = ([n, s]: bigint[]) => (s * power(n)) % MOD;

console.log(
  `${
    inp.reduce(
      (ans, li) => (ans + solve(li.trim().split(' ').map(BigInt))) % MOD,
      ZERO
    ) % MOD
  }`
);
