import * as fs from 'fs';
const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(s1);
const nums = s2
  .trim()
  .split(' ')
  .map(BigInt)
  .sort((a, b) => Number(a - b));

let cnt = 0;
for (let i = 0; i < n; i++) {
  let l = 0;
  let r = n - 1;
  const target = nums[i];
  while (1) {
    if (l === i) l++;
    if (r === i) r--;
    if (r <= l) break;
    const sum = nums[l] + nums[r];
    if (target === sum) {
      cnt++;
      break;
    } else if (target > sum) l++;
    else r--;
  }
}

console.log(cnt);
