function solution(order) {
    let pointer = 0;
    const numbers = [...Array(order.length)].map((_, i) => i + 1);
    numbers.reduce((stack, no) => {
        if (no < order[pointer]) {
            stack.push(no);
        } else {
            if (no === order[pointer]) pointer++;
            while (stack.length && stack[stack.length - 1] === order[pointer]) {
                stack.pop();
                pointer++;
            }
        }
        return stack;
    }, [])
    return pointer;
}