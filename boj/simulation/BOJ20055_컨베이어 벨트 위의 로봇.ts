import * as fs from 'fs';
const [s1, s2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = s1.split(' ').map(Number);
const A = s2.split(' ').map(Number);

const calcIdx = (idx: number) => (idx + 2 * N) % (2 * N);

const solution = (N: number, K: number, A: number[]) => {
  let level = 0;

  const conveyor = A.map((durability) => ({ durability, robot: false }));

  const window = [0, N - 1];

  const unload = () => {
    if (conveyor[window[1]].robot) conveyor[window[1]].robot = false;
  };

  const rotate = () => {
    window[0] = calcIdx(window[0] - 1);
    window[1] = calcIdx(window[1] - 1);
  };

  const moveRobots = () => {
    let i = 0;
    while (i < N) {
      const to = calcIdx(window[1] - i);
      const from = calcIdx(to - 1);
      i++;
      if (
        conveyor[to].robot ||
        conveyor[to].durability === 0 ||
        !conveyor[from].robot
      )
        continue;
      conveyor[to].robot = conveyor[from].robot;
      conveyor[to].durability--;
      conveyor[from].robot = false;
    }
  };

  const addRobot = () => {
    if (conveyor[window[0]].durability === 0) return;
    conveyor[window[0]].robot = true;
    conveyor[window[0]].durability--;
  };

  const countZero = () =>
    conveyor.reduce((acc, cur) => acc + (cur.durability === 0 ? 1 : 0), 0);

  while (countZero() < K) {
    rotate();
    unload();
    moveRobots();
    unload();
    addRobot();
    level++;
  }

  return level;
};

console.log(solution(N, K, A));
