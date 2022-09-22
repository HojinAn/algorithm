import * as fs from "fs";
const [strNM, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = strNM.trim().split(" ").map(BigInt);
const times = inp.map(BigInt).sort((a, b) => Number(b) - Number(a));

const INF = BigInt(10 ** 18);

let l = BigInt(1),
  r = INF,
  mid: bigint;

const isPossible = (target: bigint) => {
  let pplCnt = m;
  for (const time of times) {
    pplCnt -= target / time;
    if (pplCnt <= 0) return true;
  }
  return false;
};

while (l <= r) {
  mid = (l + r) / BigInt(2);
  isPossible(mid) ? (r = mid - BigInt(1)) : (l = mid + BigInt(1));
}

console.log(Number(r + BigInt(1)));
