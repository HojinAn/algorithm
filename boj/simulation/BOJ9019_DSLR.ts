import * as fs from "fs";
const [, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

class Node<T> {
  val: T;
  next?: Node<T>;
  constructor(val: T) {
    this.val = val;
  }
}

class Queue<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;
  constructor() {
    this.length = 0;
  }

  push(val: T) {
    const node = new Node<T>(val);
    !this.head ? (this.head = node) : (this.tail!.next = node);
    this.tail = node;
    this.length++;
  }

  shift() {
    if (!this.head) return undefined;
    const popped = this.head;
    this.head = popped.next;
    !this.head && (this.tail = undefined);
    popped.next = undefined;
    this.length--;
    return popped.val;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const UNDER_10000 = 10000;
const MAX_9999 = 9999;
const UNIT_10 = 10;
const D = "D";
const S = "S";
const L = "L";
const R = "R";

const calcD = (n: number) => (2 * n) % UNDER_10000;
const calcS = (n: number) => (n === 0 ? MAX_9999 : n - 1);
const calcL = (n: number) => {
  const mutiple10 = n * UNIT_10;
  return (mutiple10 % UNDER_10000) + Math.floor(mutiple10 / UNDER_10000);
};
const calcR = (n: number) => {
  const divide10 = n / UNIT_10;
  return Math.floor(divide10) + ((UNDER_10000 * divide10) % UNDER_10000);
};

const commandInitToLast = (
  init: number,
  last: number,
  visited = Array(UNDER_10000).fill(false)
) => {
  const q = new Queue<[number, string]>();
  q.push([init, ""]);
  visited[init] = true;
  while (!q.isEmpty()) {
    const [curNo, command] = q.shift()!;
    if (curNo === last) return command;
    let next = calcD(curNo);
    !visited[next] && ((visited[next] = true), q.push([next, command + D]));
    next = calcS(curNo);
    !visited[next] && ((visited[next] = true), q.push([next, command + S]));
    next = calcL(curNo);
    !visited[next] && ((visited[next] = true), q.push([next, command + L]));
    next = calcR(curNo);
    !visited[next] && ((visited[next] = true), q.push([next, command + R]));
  }
  return "";
};

console.log(
  input
    .reduce((answer, li) => {
      const [init, last] = li.trim().split(" ").map(Number);
      answer.push(commandInitToLast(init, last));
      return answer;
    }, <string[]>[])
    .join("\n")
);
