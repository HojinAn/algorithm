class QNode {
  val: number;
  next?: QNode;
  prev?: QNode;
  constructor(val) {
    this.val = val;
  }
}

class Queue {
  _size: number = 0;
  head?: QNode;
  tail?: QNode;
  size() {
    return this._size;
  }
  addLast(node: QNode) {
    if (!this.head) this.head = node;
    else {
      this.tail!.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    this._size++;
  }
  add(node: QNode) {
    return this.addLast(node);
  }
  poll() {
    if (!this.head) return undefined;
    if (this._size === 1) this.tail = undefined;
    const oldHead = this.head;
    this.head = this.head.next;
    oldHead.next = undefined;
    this.head!.prev = undefined;
    this._size--;
    return oldHead;
  }
  peek() {
    return this.head;
  }
}

class Deque extends Queue {
  peekFirst() {
    return this.peek();
  }
  peekLast() {
    return this.tail;
  }
  pop() {
    if (!this.tail) return undefined;
    if (this._size === 1) this.head = undefined;
    const poppedNode = this.tail;
    this.tail = this.tail.prev;
    poppedNode.prev = undefined;
    this.tail!.prev = undefined;
    this._size--;
    return poppedNode;
  }
  addFirst(node: QNode) {
    if (!this.tail) this.tail = node;
    else {
      this.head!.prev = node;
      node.next = this.head;
    }
    this.head = node;
    this._size++;
  }
}
