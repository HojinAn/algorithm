import * as fs from "fs";
const [[n, m, x, y, k], ...map] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const commands = map.pop()!;

class Dice {
  private top: number;
  private bottom: number;
  private left: number;
  private right: number;
  private front: number;
  private back: number;
  private r: number;
  private c: number;
  constructor(r: number, c: number) {
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
    this.front = 0;
    this.back = 0;
    this.r = r;
    this.c = c;
  }
  rotate = (no: number) => {
    let tmp = this.top;
    switch (no) {
      case 1:
        this.top = this.left;
        this.left = this.bottom;
        this.bottom = this.right;
        this.right = tmp;
        break;
      case 2:
        this.top = this.right;
        this.right = this.bottom;
        this.bottom = this.left;
        this.left = tmp;
        break;
      case 3:
        this.top = this.front;
        this.front = this.bottom;
        this.bottom = this.back;
        this.back = tmp;
        break;
      case 4:
        this.top = this.back;
        this.back = this.bottom;
        this.bottom = this.front;
        this.front = tmp;
        break;
    }
  };
  setLocation = (r: number, c: number) => ((this.r = r), (this.c = c));
  doStamp = () =>
    map[this.r][this.c]
      ? ((this.bottom = map[this.r][this.c]), (map[this.r][this.c] = 0))
      : (map[this.r][this.c] = this.bottom);
  getRC = () => [this.r, this.c];
  getTop = () => this.top;
}

const dir = [[], [0, 1], [0, -1], [-1, 0], [1, 0]];
const dice = new Dice(x, y);
const answer: number[] = [];

const checkIsInRange = (r: number, c: number) =>
  0 <= r && r < n && 0 <= c && c < m;

commands.forEach((no) => {
  const [r, c] = dice.getRC();
  const [nr, nc] = [r + dir[no][0], c + dir[no][1]];
  checkIsInRange(nr, nc) &&
    (dice.rotate(no),
    dice.setLocation(nr, nc),
    dice.doStamp(),
    answer.push(dice.getTop()));
});

console.log(answer.join("\n"));
