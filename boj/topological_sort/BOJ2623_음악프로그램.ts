import * as fs from 'fs';

class Node {
  no: number;
  parents: Node[];
  children: Node[];
  constructor(no: number) {
    this.no = no;
    this.parents = [];
    this.children = [];
  }
}

const toNums = (str: string) => str.trim().split(' ').map(Number);

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = toNums(S);
const nodes = [...Array(n + 1)].map((_, i) => new Node(i));
inp.forEach((li) => {
  const [cnt, ...singers] = toNums(li);
  for (let i = 1; i < cnt; i++) {
    const [p, c] = [singers[i - 1], singers[i]];
    nodes[p].children.push(nodes[c]);
    nodes[c].parents.push(nodes[p]);
  }
});

const visited = Array(n + 1).fill(false);
const recur = Array(n + 1).fill(false);
let circle = false;
const ans: number[] = [];

const dfs = (num: number) => {
  visited[num] = true;
  recur[num] = true;
  for (const { no } of nodes[num].parents) {
    if ((!visited[no] && dfs(no)) || recur[no]) return (circle = true);
  }
  ans.push(num);
  recur[num] = false;
  return false;
};

const startList = nodes.slice(1).filter(({ children }) => !children.length);
startList.forEach(({ no }) => dfs(no));

console.log(circle ? 0 : ans.join('\n'));
