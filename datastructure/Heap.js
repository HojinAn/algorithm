class Heap {
  constructor(comparator = (a, b) => a < b) {
    this.items = [];
    this.comparator = comparator;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  swap(a, b) {
    const tmp = this.items[a];
    this.items[a] = this.items[b];
    this.items[b] = tmp;
  }

  peek() {
    return this.items[0];
  }

  push(node) {
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
    this.items[0] = this.items.pop(); // 끝에 있는 노드를 부모로 만들고
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
