import * as fs from 'fs';

const toNums = (s: string) => s.trim().split(' ').map(Number);

const initCoords = (n: number) => (no: number) =>
  [Math.floor((no - 1) / n), (no - 1) % n];

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = toNums(S);
const initCoordsN = initCoords(n);
const cmdMap = new Map<number, number[]>();
const cmds = inp.map((s) => {
  const [no, r, c] = toNums(s);
  cmdMap.get(no) || cmdMap.set(no, initCoordsN(no));
  return [no, r - 1, c - 1];
});

console.log(
  cmds
    .reduce<number[]>((ans, [no, tr, tc]) => {
      const [r, c] = cmdMap.get(no)!;
      const [dr, dc] = [(tr - r + n) % n, (tc - c + n) % n];
      cmdMap.forEach(([cr, cc], m) => {
        cr === r && cmdMap.set(m, [cr, (cc + dc) % n]);
        [, cc] = cmdMap.get(m)!;
        cc === tc && cmdMap.set(m, [(cr + dr) % n, cc]);
      });
      ans.push(dr + dc);
      return ans;
    }, [])
    .join('\n')
);
