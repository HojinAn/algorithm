import * as fs from "fs";
const [[n, m], [R, C, D], ...dirtyMap] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const dirNo = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const checkRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m;

class Cleaner {
  private r: number;
  private c: number;
  private dir: number;
  private cnt: number;
  constructor(r: number, c: number, dir: number) {
    this.r = r;
    this.c = c;
    this.dir = dir;
    this.cnt = 0;
  }
  operate = () => this.cleanHere();
  getCnt = () => this.cnt;
  private cleanHere = () => {
    dirtyMap[this.r][this.c] = 2;
    this.cnt++;
    this.research();
  };
  private research = () => {
    for (let i = 0; i < 4; i++) {
      if (this.checkLeft()) {
        this.rotateL(), this.moveTo(0), this.cleanHere();
        return;
      } else this.rotateL();
    }
    this.checkBackward() && (this.moveTo(2), this.research());
  };
  private getNRNC = (no: number) => {
    const dirN = dirNo[(this.dir + no) % 4];
    return [this.r + dirN[0], this.c + dirN[1]];
  };
  private checkLeft = () => {
    const [nr, nc] = this.getNRNC(3);
    return checkRange(nr, nc) && !dirtyMap[nr][nc];
  };
  private checkBackward = () => {
    const [nr, nc] = this.getNRNC(2);
    return checkRange(nr, nc) && dirtyMap[nr][nc] !== 1;
  };
  private rotateL = () => (this.dir = (this.dir + 3) % 4);
  private moveTo = (no: number) => ([this.r, this.c] = this.getNRNC(no));
}

const cleaner = new Cleaner(R, C, D);
cleaner.operate();
console.log(cleaner.getCnt());
