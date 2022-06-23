export {};
class Node<T> {
  val: T;
  next?: Node<T>;
  prev?: Node<T>;
  constructor(val) {
    this.val = val;
  }
}
/*
Queue, Stack, Deque로 활용 가능
DoubleLinkedList
 */
class DLL<T> {
  _size: number;
  head?: Node<T>;
  tail?: Node<T>;
  constructor() {
    this._size = 0;
  }
  size() {
    return this._size;
  }
  addLast(node: Node<T>) {
    if (!this.head) this.head = node;
    else {
      this.tail!.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    this._size++;
  }
  addFirst(node: Node<T>) {
    if (!this.tail) this.tail = node;
    else {
      this.head!.prev = node;
      node.next = this.head;
    }
    this.head = node;
    this._size++;
  }
  add(node: Node<T>) {
    return this.addLast(node);
  }
  poll() {
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this._size === 1) {
      this.tail = undefined;
      this.head = undefined;
    } else {
      this.head = oldHead.next;
      this.head!.prev = undefined;
      oldHead.next = undefined;
    }
    this._size--;
    return oldHead;
  }
  pollLast() {
    if (!this.tail) return undefined;
    const oldTail = this.tail;
    if (this._size === 1) {
      this.tail = undefined;
      this.head = undefined;
    } else {
      this.tail = oldTail.prev;
      this.tail!.next = undefined;
      oldTail.prev = undefined;
    }
    this._size--;
    return oldTail;
  }
  peek() {
    return this.head;
  }
  peekLast() {
    return this.tail;
  }
}
