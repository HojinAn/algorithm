import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();
if (n === 1) console.log(0);
else if (n === 2) console.log(1);
else {
  const checkIsPrime = (no: number) => {
    if (no === 2) return true;
    if (!(no % 2)) return false;
    for (let i = 3; i * i <= no; i += 2) if (!(no % i)) return false;
    return true;
  };

  const primeArr = <number[]>[];
  for (let i = 2; i <= n; i++) if (checkIsPrime(i)) primeArr.push(i);

  const counter = primeArr.reduce(
    (cntr, no) => (cntr.set(no, 1), cntr),
    new Map<number, number>()
  );

  let l = 0;
  let r = 1;
  while (l < r) {
    let sum = 0;
    for (let i = l; i <= r; i++) sum += primeArr[i];
    counter.set(sum, (counter.get(sum) ?? 0) + 1);
    if (sum > n) {
      if (r - l === 1) break;
      l++;
      r = l + 1;
      continue;
    } else r++;
  }
  console.log(counter.get(n) ?? 0);
}
