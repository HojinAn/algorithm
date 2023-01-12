import * as fs from "fs";
const [S1, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = parseInt(S1);
const ZERO = BigInt(0);
class Island {
  no: number;
  depth?: number;
  parent?: number;
  children: number[];
  cnt: bigint;
  constructor(no: number) {
    this.no = no;
    this.children = [];
    this.cnt = ZERO;
  }

  setDepth(depth: number) {
    this.depth = depth;
  }

  setParent(parent: number) {
    this.parent = parent;
  }

  setCnt(cnt: bigint) {
    this.cnt = cnt;
  }

  pushChild(no: number) {
    this.children.push(no);
  }
}

const ROOT = 1;
const links = [...Array(n + 1)].map(() => <number[]>[]);
const islands = [...Array(n + 1)].map((_, i) => new Island(i));
const visited = Array(n + 1).fill(false);

const checkIsWolf = (str: string) => str === "W";
const makeTree = (no: number, depth: number) => {
  islands[no].setDepth(depth);
  links[no].forEach((next) => {
    if (!visited[next]) {
      visited[next] = true;
      makeTree(next, depth + 1);
      islands[no].pushChild(next);
      islands[next].setParent(no);
    }
  });
};

const countSheep = (no: number) => {
  const curIsland = islands[no];
  if (!curIsland.children.length) return curIsland.cnt;
  curIsland.children.forEach((next) => {
    const childCnt = countSheep(next);
    curIsland.cnt += childCnt < 0 ? ZERO : childCnt;
  });
  return curIsland.cnt;
};

inp.forEach((li, idx) => {
  const no = idx + 2;
  const [t, aS, pS] = li.trim().split(" ");
  const [a, p] = [BigInt(aS), Number(pS)];
  links[no].push(p);
  links[p].push(no);
  islands[no].setCnt(checkIsWolf(t) ? -a : a);
});

visited[ROOT] = true;
makeTree(ROOT, 1);

console.log(`${countSheep(ROOT)}`);
