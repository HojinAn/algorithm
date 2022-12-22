import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +S;
let idx = 0;

class Planet {
  x: number;
  y: number;
  r: number;
  constructor([x, y, r]: number[]) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

const checkContain =
  ([X, Y]: number[]) =>
  ({ x, y, r }: Planet) =>
    Math.sqrt((X - x) ** 2 + (Y - y) ** 2) < r;

const solution = (from: number[], to: number[], planets: Planet[]) =>
  planets.reduce(
    (cnt, p) => (cnt += checkContain(from)(p) !== checkContain(to)(p) ? 1 : 0),
    0
  );

console.log(
  [...Array(T)]
    .reduce((ans) => {
      const [x1, y1, x2, y2] = inp[idx++].trim().split(' ').map(Number);
      const n = +inp[idx++];
      const planets = inp
        .slice(idx, (idx += n))
        .map((li) => new Planet(li.trim().split(' ').map(Number)));
      ans.push(solution([x1, y1], [x2, y2], planets));
      return ans;
    }, [])
    .join('\n')
);
