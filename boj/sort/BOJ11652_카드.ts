import * as fs from 'fs';
const [, ...nums] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(
  Object.entries<number>(
    nums.reduce((counter, num) => {
      counter[num] = (counter[num] ?? 0) + 1;
      return counter;
    }, {})
  ).sort(([k1, v1], [k2, v2]) =>
    v1 === v2 ? Number(BigInt(k1) - BigInt(k2)) : v2 - v1
  )[0][0]
);
