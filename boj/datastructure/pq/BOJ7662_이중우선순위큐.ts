class PriorityQueue<T = number> {
  items: T[];
  comparator: (a: T, b: T) => boolean;
  constructor(comparator = (a: T, b: T) => a < b) {
    this.items = [];
    this.comparator = comparator;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  getLeftChildIndex(parentIndex: number) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex: number) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  swap(a: number, b: number) {
    const tmp = this.items[a];
    this.items[a] = this.items[b];
    this.items[b] = tmp;
  }

  peek() {
    return this.items[0];
  }

  push(node: T) {
    this.items.push(node);
    this.heapifyUp(); // 배열에 가장 끝에 넣고, 다시 min heap 의 형태를 갖추도록 한다.
  }

  // 최근에 삽입된 노드가 제 자리를 찾아갈 수 있도록 하는 메소드
  heapifyUp() {
    let index = this.items.length - 1; // 계속해서 변하는 index 값
    let parentIndex = this.getParentIndex(index);

    while (
      // 루트노드가 되기 전까지
      parentIndex >= 0 &&
      // 부모 노드가 뒤로 가야 한다면
      this.comparator(this.items[index], this.items[parentIndex])
    ) {
      // 부모의 자리를 계속해서 아래로 내린다.
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  poll() {
    if (this.size() < 2) return this.items.pop();
    const rootNode = this.peek();
    this.items[0] = this.items.pop()!; // 끝에 있는 노드를 부모로 만들고
    this.heapifyDown(); // 다시 heap 의 형태를 갖추도록 한다.
    return rootNode;
  }

  // 변경된 루트노드가 제 자리를 찾아가도록 하는 메소드
  heapifyDown() {
    let index = 0;
    const count = this.items.length;
    let leftIdx = this.getLeftChildIndex(index);
    let rightIdx = this.getRightChildIndex(index);

    // 계속해서 left child 가 있을 때 까지 검사한다.
    while (leftIdx < count) {
      // 왼쪽, 오른쪽 중에 더 작은 노드를 찾는다
      const childIdx =
        rightIdx < count &&
        // rightChild 가 있다면 우선순위를 값을 비교해서 더 알맞은 값을 찾는다.
        this.comparator(this.items[rightIdx], this.items[leftIdx])
          ? rightIdx
          : // 없다면 leftChild 가 더 작은 값을 가지는 인덱스가 된다.
            leftIdx;

      // 자식 노드의 우선순위가 부모노드보다 크다면 탈출
      if (this.comparator(this.items[index], this.items[childIdx])) break;
      this.swap(index, childIdx);

      index = childIdx;
      leftIdx = this.getLeftChildIndex(index);
      rightIdx = this.getRightChildIndex(index);
    }
  }
}

import * as fs from "fs";
const [S, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let T = Number(S);
let idx = 0;
const DEL = "D";
const INS = "I";
const EMPTY = "EMPTY";

const minPQ = new PriorityQueue();
const maxPQ = new PriorityQueue((a, b) => a > b);
const counter = new Map<number, number>();

const trimPQ = (pq: PriorityQueue) => {
  while (pq.size() && counter.get(pq.peek()) === 0) pq.poll();
};

const insertNum = (no: number) => (maxPQ.push(no), minPQ.push(no));
const deleteNum = (pq: PriorityQueue) => {
  trimPQ(pq);
  if (!pq.size()) return;
  const cur = pq.poll()!;
  counter.set(cur, counter.get(cur)! - 1);
};

const print = () => {
  trimPQ(maxPQ);
  trimPQ(minPQ);
  if (!maxPQ.size()) return EMPTY;
  return `${maxPQ.poll()} ${minPQ.poll()}`;
};
const clear = () => {
  maxPQ.clear();
  minPQ.clear();
  counter.clear();
};

const operator = {
  I(no: number) {
    insertNum(no);
    counter.set(no, (counter.get(no) ?? 0) + 1);
  },
  D(no: number) {
    deleteNum(no === 1 ? maxPQ : minPQ);
  },
};

const ans: string[] = [];
while (T--) {
  const k = Number(inp[idx++]);
  for (let i = idx; i < idx + k; i++) {
    const [cmd, no] = inp[i].trim().split(" ");
    operator[cmd](+no);
  }
  ans.push(print());
  clear();
  idx += k;
}

console.log(ans.join("\n"));
