class Node<T> {
  data: T;
  prev: Node<T> | null;
  next: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class Deque<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  pushFront(data: T) {
    const newNode = new Node(data);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head!.prev = newNode;
      this.head = newNode;
    }
    this.size += 1;
  }

  pushBack(data: T) {
    const newNode = new Node(data);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;
  }

  popFront() {
    if (this.size === 0) {
      return -1;
    }
    const data = this.head!.data;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }
    this.size -= 1;
    return data;
  }

  popBack() {
    if (this.size === 0) {
      return -1;
    }
    const data = this.tail!.data;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }
    this.size -= 1;
    return data;
  }

  empty() {
    return this.size === 0 ? 1 : 0;
  }

  front() {
    return this.size === 0 ? -1 : this.head!.data;
  }

  back() {
    return this.size === 0 ? -1 : this.tail!.data;
  }

  getSize() {
    return this.size;
  }
}

import * as fs from 'fs';
const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dq = new Deque<number>();

console.log(
  inp
    .reduce((ans, li) => {
      const [cmd, num] = li.split(' ').map(Number);
      switch (cmd) {
        case 1:
          dq.pushFront(num);
          break;
        case 2:
          dq.pushBack(num);
          break;
        case 3:
          ans.push(dq.popFront());
          break;
        case 4:
          ans.push(dq.popBack());
          break;
        case 5:
          ans.push(dq.getSize());
          break;
        case 6:
          ans.push(dq.empty() ? 1 : 0);
          break;
        case 7:
          ans.push(dq.front());
          break;
        case 8:
          ans.push(dq.back());
          break;
      }
      return ans;
    }, <number[]>[])
    .join('\n') 
);
