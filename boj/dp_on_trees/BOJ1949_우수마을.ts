import * as fs from 'fs';

class Town {
  no: number;
  cnt: number;
  link: number[];
  onOff: [number, number];
  constructor(no: number, cnt: number) {
    this.no = no;
    this.cnt = cnt;
    this.link = [];
    this.onOff = [cnt, 0];
  }
}

const toNums = (s: string) => s.trim().split(' ').map(Number);
const findDPMax = (towns: Town[]) => {
  const visited = Array(n + 1).fill(false);
  const dfs = (cur: number) => {
    towns[cur].link.forEach((next) => {
      if (!visited[next]) {
        visited[next] = true;
        const nOnOff = dfs(next);
        const [on, off] = towns[cur].onOff;
        towns[cur].onOff = [on + nOnOff[1], off + Math.max(...nOnOff)];
      }
    });
    return towns[cur].onOff;
  };
  visited[1] = true;
  return Math.max(...dfs(1));
};

const [s1, s2, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = Number(s1);
const citizens = [0, ...toNums(s2)];
const towns = citizens.map((cnt, i) => new Town(i, cnt));
inp.forEach((li) => {
  const [u, v] = toNums(li);
  towns[u].link.push(v);
  towns[v].link.push(u);
});
console.log(findDPMax(towns));
