import * as fs from "fs";
const [[n], ...treeInfo] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

class Node {
  val: number;
  leftChild?: Node;
  rightChild?: Node;
  constructor(val: number) {
    this.val = val;
  }
}

const nodes = [...Array(n + 1)].map((_, i) => new Node(i));
let cnt = 0;
let visitCnt = 0;
treeInfo.forEach(([p, l, r]) => {
  l !== -1 && (nodes[p].leftChild = nodes[l]);
  r !== -1 && (nodes[p].rightChild = nodes[r]);
});

const traverse = (node: Node) => {
  if (node.leftChild) {
    cnt++;
    traverse(node.leftChild);
    cnt++;
  }
  visitCnt++;
  if (node.rightChild) {
    cnt++;
    traverse(node.rightChild);
    if (visitCnt < n) cnt++;
  }
};

traverse(nodes[1]);
console.log(cnt);
