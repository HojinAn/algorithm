import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = S.trim().split(' ').map(Number);

const root = 1;
const visited = Array(n + 1).fill(false);

const goToParent = (no: number, target = no, ans = 0) =>
  no === root
    ? (ans || (visited[target] = true), ans)
    : goToParent(no >> 1, target, visited[no] ? no : ans);

console.log(
  inp
    .reduce((ans, s) => (ans.push(goToParent(Number(s))), ans), <number[]>[])
    .join('\n')
);
