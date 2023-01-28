import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

if (n <= 20) {
  const ans = <string[]>[];
  const hanoi = (size: number, [from, via, to]: number[]) =>
    size === 1
      ? ans.push(`${from} ${to}`)
      : (hanoi(size - 1, [from, to, via]),
        hanoi(1, [from, via, to]),
        hanoi(size - 1, [via, from, to]));
  hanoi(n, [1, 2, 3]);
  console.log(ans.length);
  console.log(ans.join('\n'));
} else {
  const ONE = BigInt(1);
  const TWO = BigInt(2);
  const hanoi = (n: number): bigint =>
    n === 1 ? ONE : TWO * hanoi(n - 1) + ONE;
  console.log(`${hanoi(n)}`);
}
