/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function detectCycle(head) {
    let pointer = head;
    const visited = new Set();
    while (pointer) {
        if (visited.has(pointer)) return pointer;
        visited.add(pointer);
        pointer = pointer.next;
    }
    return pointer;
};