import * as fs from 'fs';

const LEN = 5;
const inp = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const myGrid = inp.slice(0, 5).map((s) => s.trim().split(' ').map(Number));
const ansGrid = inp.slice(5).map((s) => s.trim().split(' ').map(Number));
const selected = [...Array(LEN)].map(() => Array(LEN).fill(false));

const checkSelected = (no: number) => {
  for (let r = 0; r < LEN; r++)
    for (let c = 0; c < LEN; c++)
      if (myGrid[r][c] === no) {
        selected[r][c] = true;
        return;
      }
};

const countRow = (r: number) => {
  return selected[r].every((s) => s) ? 1 : 0;
};

const countCol = (c: number) => {
  for (let i = 0; i < LEN; i++) if (!selected[i][c]) return 0;
  return 1;
};

const countDiag = (cnt = 0) => {
  let flag = true;
  for (let i = 0; i < LEN; i++) {
    if (!selected[i][i]) {
      flag = false;
      break;
    }
  }
  flag && cnt++;
  flag = true;
  for (let i = 0; i < LEN; i++) {
    if (!selected[i][LEN - 1 - i]) {
      flag = false;
      break;
    }
  }
  flag && cnt++;
  return cnt;
};

const count = (cnt = 0) => {
  for (let i = 0; i < LEN; i++) {
    cnt += countRow(i);
    cnt += countCol(i);
  }
  cnt += countDiag();
  return cnt;
};

(() => {
  for (let r = 0; r < LEN; r++) {
    for (let c = 0; c < LEN; c++) {
      checkSelected(ansGrid[r][c]);
      if (count() >= 3) {
        console.log(LEN * r + c + 1);
        return;
      }
    }
  }
})();
