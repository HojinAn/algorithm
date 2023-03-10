/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 */
function Solution(head) {
    this.head = head;
    this.length = (() => {
        let pointer = head;
        let n = 0;
        while (pointer) {
            pointer = pointer.next;
            n++;
        }
        return n;
    })();
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function() {
    const rand = Math.floor(Math.random() * this.length);
    let pointer = this.head;
    let idx = 0;
    while (idx++ < rand) {
        pointer = pointer.next;
    }
    return pointer.val;
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */