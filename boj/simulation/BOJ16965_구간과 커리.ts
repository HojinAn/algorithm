import * as fs from 'fs';

const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const ans = <number[]>[];
const nodes = <number[][]>[];

const checkCanMove = (a: number, b: number) => {
  const n = nodes.length;
  const visited = Array(n).fill(false);

  const dfs = (no: number) => {
    return nodes[no].some((next) => {
      if (next === b) return true;
      if (!visited[next]) {
        visited[next] = true;
        return dfs(next);
      }
      return false;
    });
  };

  visited[a] = true;
  return dfs(a);
};

const renewNodes = (sect: number[][]) => {
  const isPossibleToMove = ([from, to]: number[]) => {
    const [x1, y1] = sect[from];
    const [x2, y2] = sect[to];
    return (x2 < x1 && x1 < y2) || (x2 < y1 && y1 < y2);
  };
  const m = sect.length - 1;
  nodes[m] = [];
  for (let i = 0; i < m; i++)
    isPossibleToMove([i, m]) && nodes[i].push(m),
      isPossibleToMove([m, i]) && nodes[m].push(i);
};

inp.reduce<number[][]>((sect, s) => {
  const [cmd, from, to] = s.trim().split(' ').map(Number);
  switch (cmd) {
    case 1:
      sect.push([from, to]);
      renewNodes(sect);
      break;
    case 2:
      ans.push(checkCanMove(from - 1, to - 1) ? 1 : 0);
      break;
  }
  return sect;
}, []);

console.log(ans.join('\n'));
