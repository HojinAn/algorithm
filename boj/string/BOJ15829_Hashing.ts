import * as fs from 'fs';
const [, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const MOD = 1234567891;
console.log(
  str.split('').reduce((hash, char, idx) => {
    let val = char.charCodeAt(0) - 96;
    for (let i = 0; i < idx; i++) (val *= 31), (val %= MOD);
    return (hash + val) % MOD;
  }, 0)
);
