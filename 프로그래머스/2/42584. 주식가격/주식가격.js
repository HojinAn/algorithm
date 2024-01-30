function solution(prices) {
    const ans = Array(prices.length).fill(0);
    const stack = prices.reduce((stack, price, i) => {
        if (!stack.length) {
            stack.push([price, i]);
            return stack;
        }
        while (stack.length) {
            const [prevP, prevI] = stack.pop();
            if (prevP <= price) {
                stack.push([prevP, prevI])
                break;
            }
            ans[prevI] = i - prevI;
        }
        stack.push([price, i]);
        return stack;
    }, []);
    stack.forEach(([price, i]) => ans[i] = prices.length - 1 - i);
    return ans;
}