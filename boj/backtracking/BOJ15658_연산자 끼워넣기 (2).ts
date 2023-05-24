import * as fs from 'fs';
const [s1, s2, s3] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = +s1;
const nums = s2.split(' ').map(Number);
const [plus, minus, mul, div] = s3.split(' ').map(Number);

let [max, min] = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];

const dfs = (
  depth: number,
  sum: number,
  [plus, minus, multi, div]: number[]
) => {
  if (depth === n) {
    max = Math.max(max, sum);
    min = Math.min(min, sum);
    return;
  }
  plus && dfs(depth + 1, sum + nums[depth], [plus - 1, minus, multi, div]);
  minus && dfs(depth + 1, sum - nums[depth], [plus, minus - 1, multi, div]);
  multi && dfs(depth + 1, sum * nums[depth], [plus, minus, multi - 1, div]);
  div &&
    dfs(depth + 1, Math.trunc(sum / nums[depth]), [
      plus,
      minus,
      multi,
      div - 1,
    ]);
};

dfs(1, nums[0], [plus, minus, mul, div]);
console.log(`${max}\n${min}`);
