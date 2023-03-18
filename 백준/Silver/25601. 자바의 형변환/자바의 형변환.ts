import * as fs from 'fs';

class Node {
  val: string;
  parent: string;
  children: string[];
  constructor(val: string) {
    this.val = val;
    this.children = [];
  }
}

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +S;

const nodes = <{ [x: string]: Node }>{};

inp.slice(0, n - 1).forEach((s) => {
  const [child, parent] = s.trim().split(' ');
  nodes[parent] = nodes[parent] ?? new Node(parent);
  nodes[parent].children.push(child);
  nodes[child] = nodes[child] ?? new Node(child);
  nodes[child].parent = parent;
});

const [cls1, cls2] = inp[n - 1].trim().split(' ');

let isPossible = false;

let pointer = nodes[cls1];

while (pointer) {
  pointer.val === cls2 && (isPossible = true);
  pointer = nodes[pointer.parent];
}

pointer = nodes[cls2];

while (pointer) {
  pointer.val === cls1 && (isPossible = true);
  pointer = nodes[pointer.parent];
}

console.log(isPossible ? 1 : 0);
