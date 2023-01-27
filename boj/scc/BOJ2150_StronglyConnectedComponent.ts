import * as fs from 'fs';

const toNums = (str: string) => str.trim().split(' ').map(Number);
const scc = (nodes: number[][], n: number, stack: number[]) => {
  const visited = Array(n + 1).fill(false);
  visited[0] = true;

  /**
   * 2. 역방향 그래프 탐색
   */
  if (stack.length) {
    const rDFS = (no: number, group = [no]) => {
      nodes[no].forEach((next) => {
        if (!visited[next]) {
          visited[next] = true;
          group.push(next);
          rDFS(next, group);
        }
      });
      return group;
    };
    const ans: number[][] = [];
    while (stack.length) {
      const cur = stack.pop()!;
      if (!visited[cur]) {
        visited[cur] = true;
        ans.push(
          rDFS(cur)
            .sort((a, b) => a - b)
            .concat(-1)
        );
      }
    }
    return ans.sort(([a], [b]) => a - b);
  }
  /**
   * 1. 정방향 그래프 탐색
   */
  const DFS = (no: number) => {
    nodes[no].forEach((next) => {
      if (!visited[next]) {
        visited[next] = true;
        DFS(next);
        stack.push(next);
      }
    });
  };
  nodes.forEach((_, i) => {
    if (!visited[i]) {
      visited[i] = true;
      DFS(i);
      stack.push(i);
    }
  });
};

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [V] = toNums(S);
const forwards = [...Array(V + 1)].map<number[]>(() => []);
const backwards = [...Array(V + 1)].map<number[]>(() => []);
const stack: number[] = [];
inp.forEach((li) => {
  const [from, to] = toNums(li);
  forwards[from].push(to);
  backwards[to].push(from);
});

scc(forwards, V, stack);
const ans = scc(backwards, V, stack)!;

console.log(ans.length);
console.log(ans.map((li) => li.join(' ')).join('\n'));
