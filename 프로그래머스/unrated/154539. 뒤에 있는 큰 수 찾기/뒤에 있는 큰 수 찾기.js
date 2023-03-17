function solution(numbers) {
    const ans = [-1];
   	const n = numbers.length;
    let max = numbers[n - 1];
    const stack = [max];
    for (let i = n - 2; i >= 0; i--) {
        const no = numbers[i];
        max = Math.max(max, no);
        if (no < stack[stack.length - 1]) {
            ans.push(stack[stack.length - 1]);
        } else {
            if (no === max) ans.push(-1);
            else {
                while (no >= stack[stack.length - 1]) {
                    stack.pop();
                }
                ans.push(stack[stack.length - 1]);
            }
        }
        stack.push(no);
    }
    
    return ans.reverse();
}