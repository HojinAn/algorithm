function solution(number, k, size = `${number}`.length - k) {
    return `${number}`.split('').map(Number).reduce((stack, no) => {
        while (stack.length && stack[stack.length - 1] < no && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(no);
        return stack;
    }, []).slice(0, size).join('');
}