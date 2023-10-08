import * as fs from 'fs';
const [a, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [r, c, k] = a.split(' ').map(Number);
const init = inp.map((e) => e.split(' ').map(Number));

const doSort = (li: number[]) => {
  const counter = li.reduce((map, no) => {
    if (no === 0) return map;
    map.set(no, (map.get(no) || 0) + 1);
    return map;
  }, new Map<number, number>());

  return Array.from(counter.entries())
    .sort(([a0, a1], [b0, b1]) => (a1 === b1 ? a0 - b0 : a1 - b1))
    .reduce((nArr, li) => {
      nArr.push(...li);
      return nArr;
    }, <number[]>[]);
};

const flipDiagonal = (arr: number[][]) => {
  const r = arr.length;
  return arr[0].map((_, c) => {
    const nArr: number[] = [];
    for (let i = 0; i < r; i++) {
      nArr.push(arr[i][c]);
    }
    return nArr;
  });
};

const R = (arr: number[][]): number[][] => {
  let max = 0;
  return arr
    .map((li) => {
      const nLi = doSort(li);
      max = Math.max(max, nLi.length);
      return nLi;
    })
    .map((li) => [...li, ...Array(max - li.length).fill(0)].slice(0, 100));
};

const C = (arr: number[][]) => flipDiagonal(R(flipDiagonal(arr)));

const checkIsRight = (arr: number[][]) =>
  arr.length >= r && arr[0].length >= c && arr[r - 1][c - 1] === k;

const solution = (arr: number[][]) => {
  for (let i = 0; i <= 100; i++) {
    if (checkIsRight(arr)) {
      console.log(i);
      return;
    }
    if (arr.length >= arr[0].length) {
      arr = R(arr);
    } else {
      arr = C(arr);
    }
  }
  console.log(-1);
};

solution(init);
