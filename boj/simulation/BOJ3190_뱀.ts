import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 입력 처리
let idx = 0;
const n = +inp[idx++];
const k = +inp[idx++];
const map = [...Array(n)].map(() => Array(n).fill(0)); // 사과는 2, 뱀은 1
inp.slice(idx, (idx += k)).forEach((el) => {
  const [r, c] = el
    .trim()
    .split(" ")
    .map((el) => +el - 1);
  map[r][c] = 2;
});
const l = +inp[idx++];
const transInfo = inp.slice(idx).map((li) => {
  const [el1, el2] = li.trim().split(" ");
  return [+el1, el2];
});

// 필요한 상수, 변수 선언
const dir = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let curPos = [[0, 0]];
let curDir = 0;
let infoIdx = 0;
let time = 1;

const setMap = (pos: number[][]) => {
  pos.forEach(([r, c]) => (map[r][c] = 1));
};
const stretchBody = (pos: number[][], dirNo: number) => {
  const newHead = [pos[0].map((el, i) => el + dir[dirNo][i])];
  return newHead.concat(pos);
};
const eatApple = (pos: number[][]) =>
  map[pos[0][0]][pos[0][1]] === 2 ? true : false;
const outOfRange = ([r, c]: number[]) => n <= r || r < 0 || n <= c || c < 0;

// 초기 뱀 세팅
setMap(curPos);

while (1) {
  curPos = stretchBody(curPos, curDir);
  if (outOfRange(curPos[0]) || map[curPos[0][0]][curPos[0][1]] === 1) break;
  if (!eatApple(curPos)) {
    const [r, c] = curPos.pop()!;
    map[r][c] = 0;
  }
  setMap(curPos);
  if (infoIdx < l && time === transInfo[infoIdx][0]) {
    curDir =
      transInfo[infoIdx][1] === "L" ? (curDir + 3) % 4 : (curDir + 1) % 4;
    infoIdx++;
  }
  time++;
}
console.log(time);
