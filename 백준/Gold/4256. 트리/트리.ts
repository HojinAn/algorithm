import * as fs from 'fs';

const toNums = (str: string) => str.trim().split(' ').map(Number);

const getPostorder = (preorder: number[], inorder: number[], n: number) => {
  const postorder = <number[]>[];

  const findRoot = (rootIdx: number, from: number, to: number) => {
    for (let i = from; i < to; i++) {
      if (inorder[i] === preorder[rootIdx]) {
        findRoot(rootIdx + 1, from, i);
        findRoot(rootIdx + i - from + 1, i + 1, to);
        postorder.push(preorder[rootIdx]);
      }
    }
  };

  findRoot(0, 0, n);
  return postorder;
};

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let T = Number(S);
let idx = 0;
const ans = <string[]>[];
while (T--) {
  const n = Number(inp[idx++]);
  const preorder = toNums(inp[idx++]);
  const inorder = toNums(inp[idx++]);
  ans.push(getPostorder(preorder, inorder, n).join(' '));
}
console.log(ans.join('\n'));
