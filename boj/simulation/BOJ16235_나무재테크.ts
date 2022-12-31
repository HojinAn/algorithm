import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, , k] = S.trim().split(' ').map(Number);
const arrA = inp.slice(0, n).map((li) => li.trim().split(' ').map(Number));
const grid = [...Array(n)].map(() => Array(n).fill(5));
const treeStack = <Tree[]>[];

const dir = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
const checkInRange = (r: number, c: number) =>
  0 <= r && r < n && 0 <= c && c < n;

class Tree {
  r: number;
  c: number;
  age: number;
  constructor([r, c, age]: number[]) {
    this.r = r - 1;
    this.c = c - 1;
    this.age = age;
  }

  checkCanEat() {
    return grid[this.r][this.c] >= this.age;
  }

  eatFood() {
    grid[this.r][this.c] -= this.age;
  }

  increaseAge() {
    this.age += 1;
  }

  checkCanSpread() {
    return !(this.age % 5);
  }

  changeToFood() {
    grid[this.r][this.c] += Math.floor(this.age / 2);
  }

  spreadTree() {
    dir.forEach(([dr, dc]) => {
      const [nr, nc] = [this.r + dr, this.c + dc];
      checkInRange(nr, nc) && treeStack.push(new Tree([nr + 1, nc + 1, 1]));
    });
  }
}

const addFood = () =>
  arrA.forEach((li, r) => li.forEach((inc, c) => (grid[r][c] += inc)));

inp
  .slice(n)
  .forEach((li) => treeStack.push(new Tree(li.trim().split(' ').map(Number))));
const dead = <Tree[]>[];
const alive = <Tree[]>[];

[...Array(k)].forEach(() => {
  treeStack.sort((a, b) => b.age - a.age);
  while (treeStack.length) {
    const tree = treeStack.pop()!;
    tree.checkCanEat()
      ? (tree.eatFood(), tree.increaseAge(), alive.push(tree))
      : dead.push(tree);
  }
  while (dead.length) dead.pop()!.changeToFood();
  while (alive.length) {
    const tree = alive.pop()!;
    tree.checkCanSpread() && tree.spreadTree();
    treeStack.push(tree);
  }
  addFood();
});

console.log(treeStack.length);
