import * as fs from 'fs';

const MOD = 1000000;
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const SIX = 6;

const numStr = fs.readFileSync('/dev/stdin').toString().trim();

const n = numStr.length;

const cache = Array(n + 1).fill(0);

const checkOneTwo = (no: number) => no === ONE || no === TWO;

const dp = (idx: number) => {
  if (!Number(numStr[0])) return 0;
  if (idx < 1) return cache[idx];
  const no = Number(numStr[idx]);
  const prevNo = Number(numStr[idx - 1]);
  if (no === ZERO) {
    if (!checkOneTwo(prevNo)) return 0;
    cache[idx - 1] = cache[idx];
    cache[idx] = 0;
  } else
    cache[idx - 1] =
      (cache[idx] +
        ((prevNo === 2 && no <= SIX) || prevNo === 1 ? cache[idx + 1] : 0)) %
      MOD;

  return dp(idx - 1);
};

cache[n] = 1;
cache[n - 1] = 1;
console.log(dp(n - 1));
