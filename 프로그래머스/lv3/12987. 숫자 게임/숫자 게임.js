function solution(A, B) {
    const len = A.length;
    const compAsc = (a, b) => a - b;
    A.sort(compAsc);
    B.sort(compAsc);
	let aPointer = len - 1;
    let bPointer = len - 1;
    let cnt = 0;
    while (aPointer >= 0 && bPointer >= 0) {
        if (A[aPointer] < B[bPointer]) {
            cnt++;
            aPointer--;
            bPointer--;
        } else aPointer--;
    }
    return cnt;
}