import * as fs from "fs";
const [[n], parent, [d]] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.trim().split(" ").map(Number)),
  children: number[][] = [...Array(n)].map(() => []),
  root: number[] = [],
  visited = Array(n).fill(false);
let answer = 0;
const dfs = (no: number) => {
  children[no].length
    ? children[no].forEach(
        (el) => !visited[el] && ((visited[el] = true), dfs(el))
      )
    : answer++;
};
parent.forEach((el, i) => (el === -1 ? root.push(i) : children[el].push(i)));
visited[d] = true;
children[parent[d]] = children[parent[d]]?.filter((el) => el !== d);
root.forEach((el) => !visited[el] && ((visited[el] = true), dfs(el)));
console.log(answer);
