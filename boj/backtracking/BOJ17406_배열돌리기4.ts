import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let inpIdx = 0;
const [n, m, k] = inputList[inpIdx++].trim().split(" ").map(Number);
const map = inputList
  .slice(inpIdx, (inpIdx += n))
  .map((el) => el.trim().split(" ").map(Number));
const rotateInfo = inputList.slice(inpIdx).map((el) => {
  const li = el.trim().split(" ").map(Number);
  li[0]--, li[1]--;
  return li;
});

const INF = Number.MAX_SAFE_INTEGER;
let ans = INF;

const rotatePart = (
  inpMap: number[][],
  r: number,
  c: number,
  thick: number
) => {
  const rMin = r - thick,
    rMax = r + thick,
    cMin = c - thick,
    cMax = c + thick;
  const tmp = inpMap[rMin][cMin];
  for (let i = rMin; i < rMax; i++) inpMap[i][cMin] = inpMap[i + 1][cMin];
  for (let i = cMin; i < cMax; i++) inpMap[rMax][i] = inpMap[rMax][i + 1];
  for (let i = rMax; i > rMin; i--) inpMap[i][cMax] = inpMap[i - 1][cMax];
  for (let i = cMax; i > cMin + 1; i--) inpMap[rMin][i] = inpMap[rMin][i - 1];
  inpMap[rMin][cMin + 1] = tmp;
};

const rotateMap = (inpMap: number[][], infos: number[][]) => {
  infos.forEach(([r, c, s]) => {
    for (let i = 1; i <= s; i++) rotatePart(inpMap, r, c, i);
  });
};

const calcScore = (inpMap: number[][]) => {
  let min = INF;
  inpMap.forEach(
    (el) =>
      (min = Math.min(
        el.reduce((acc, cur) => acc + cur),
        min
      ))
  );
  return min;
};

const permu = (depth: number, arr: number[][], visited: number) => {
  if (depth === k) {
    const tmpMap = map.map((li) => li.slice());
    rotateMap(tmpMap, arr);
    ans = Math.min(calcScore(tmpMap), ans);
    return;
  }
  for (let i = 0; i < k; i++)
    if (!(visited & (1 << i)))
      permu(depth + 1, [...arr, rotateInfo[i]], visited | (1 << i));
};

permu(0, [], 0);

console.log(ans);
