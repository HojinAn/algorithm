import * as fs from "fs";
const [[n], ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const clsRoom = [...Array(n)].map(() => Array(n).fill(0));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const checkRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < n;

const countFav = (favs: number[], [r, c]: number[]) =>
  dir.reduce((cntFav, [dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];
    checkRange(nr, nc) && favs.includes(clsRoom[nr][nc]) && cntFav++;
    return cntFav;
  }, 0);

const countVacancy = ([r, c]: [number, number]) =>
  dir.reduce((cntVac, [dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];
    checkRange(nr, nc) && !clsRoom[nr][nc] && cntVac++;
    return cntVac;
  }, 0);

const getFavLocList = (favs: number[], max: number) =>
  clsRoom.reduce((favLocs, li, r) => {
    li.forEach((el, c) => {
      if (el) return;
      const cntFav = countFav(favs, [r, c]);
      if (cntFav === max) favLocs.push([r, c]);
      else if (cntFav > max) {
        max = cntFav;
        favLocs = [[r, c]];
      }
    });
    return favLocs;
  }, <[number, number][]>[]);

const filterLocList = (favLocList: [number, number][], max: number) =>
  favLocList.reduce((filtered, el) => {
    const cntVac = countVacancy(el);
    if (cntVac === max) filtered.push(el);
    else if (cntVac > max) {
      max = cntVac;
      filtered = [el];
    }
    return filtered;
  }, <[number, number][]>[]);

const favMap = new Map<number, number[]>();

arr.forEach(([no, ...fav]) => {
  const favLocList = getFavLocList(fav, 0);
  const [r, c] =
    favLocList.length > 1
      ? filterLocList(favLocList, 0).sort((a, b) =>
          a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
        )[0]
      : favLocList[0];
  clsRoom[r][c] = no;
  favMap.set(no, fav);
});

console.log(
  clsRoom.reduce((answer, li, r) => {
    li.forEach((no, c) => {
      let cnt = 0;
      const favList = favMap.get(no);
      dir.forEach(([dr, dc]) => {
        const [nr, nc] = [r + dr, c + dc];
        checkRange(nr, nc) && favList!.includes(clsRoom[nr][nc]) && cnt++;
      });
      cnt && (answer += 10 ** (cnt - 1));
    });
    return answer;
  }, 0)
);
