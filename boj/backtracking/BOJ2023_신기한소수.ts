import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

const isPrime = (n: number) => {
  if (n === 2) return true;
  if (!(n % 2)) return false;
  for (let i = 3; i * i <= n; i += 2) if (!(n % i)) return false;
  return true;
};

const BT = (str: string, ans: number[]) => {
  if (str.length === n) {
    ans.push(+str);
    return;
  }
  for (let i = 1; i < 10; i += 2) {
    const next = str + i;
    if (isPrime(+next)) BT(next, ans);
  }
};
const ans = <number[]>[];
[2, 3, 5, 7].forEach((i) => BT('' + i, ans));
console.log(ans.sort((a, b) => a - b).join('\n'));
