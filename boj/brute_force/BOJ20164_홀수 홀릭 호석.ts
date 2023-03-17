import * as fs from 'fs';

const nums = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('')
  .map(Number);
const len = nums.length;
let max = 0;
let min = Number.MAX_SAFE_INTEGER;

const reduceOdd = (cnt: number, no: number) => cnt + (no % 2);
const sum = (sum: number, no: number) => sum + no;

const renewMinMax = (cnt: number) => {
  max = Math.max(max, cnt);
  min = Math.min(min, cnt);
};

const countOdd2 = (no: number, cnt: number) => {
  const nums = `${no}`.split('').map(Number);
  const next = nums.reduce(sum);
  cnt += nums.reduce(reduceOdd, 0);
  if (no < 10) {
    renewMinMax(cnt);
    return;
  }
  countOdd2(next, cnt);
};

const countOdd3 = ([from, to]: number[], cnt: number, numbers = nums) => {
  const a = +numbers.slice(0, from).join('');
  const b = +numbers.slice(from, to).join('');
  const c = +numbers.slice(to).join('');
  const no = a + b + c;
  const nNums = `${no}`.split('').map(Number);
  const len = nNums.length;
  if (10 <= no && no < 100) {
    countOdd2(no, cnt);
    return;
  }
  cnt += nNums.reduce(reduceOdd, 0);
  if (no < 10) {
    renewMinMax(cnt);
    return;
  }
  for (let i = 1; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      countOdd3([i, j], cnt, nNums);
    }
  }
};

const initCnt = nums.reduce(reduceOdd, 0);

if (len > 2) {
  for (let i = 1; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      countOdd3([i, j], initCnt);
    }
  }
} else if (len === 2) {
  countOdd2(nums.reduce(sum), initCnt);
} else {
  max = initCnt;
  min = max;
}

console.log(`${min} ${max}`);
