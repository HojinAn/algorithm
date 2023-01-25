import * as fs from 'fs';

class Stack<T> {
  arr: T[];
  constructor(arr: T[]) {
    this.arr = arr;
  }

  peek() {
    return this.arr[this.arr.length - 1];
  }

  push(el: T) {
    this.arr.push(el);
  }

  pop() {
    return this.arr.pop();
  }

  isEmpty() {
    return !this.arr.length;
  }

  size() {
    return this.arr.length;
  }

  get(i: number) {
    return this.arr[i];
  }
}

type MaxStackType = {
  max: number;
  stack: Stack<number>;
};

const [, ...histogram] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map(Number);
histogram.push(0);

const solve = ({ max, stack }: MaxStackType, _, idx: number) => {
  idx++;
  while (!stack.isEmpty() && histogram[stack.peek()] > histogram[idx]) {
    const h = histogram[stack.pop()!];
    const w = stack.isEmpty() ? idx : idx - stack.peek() - 1;
    max = Math.max(max, h * w);
  }
  stack.push(idx);
  return { max, stack };
};

console.log(
  histogram.reduce<MaxStackType>(solve, {
    max: histogram[0],
    stack: new Stack([0]),
  }).max
);
