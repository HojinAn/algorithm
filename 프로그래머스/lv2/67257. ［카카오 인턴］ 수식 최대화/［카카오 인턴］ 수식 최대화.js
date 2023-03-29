function solution(expression) {
    const operators = expression.split(/\d+/g).filter(x=>x);
    const operands = expression.split(/\D/g);
    const len = operands.length;
    const expressionArr = [...operators.flatMap((op, i) => [+operands[i], op]), +operands[len - 1]];
    
    const PLUS = '+';
    const MULTI = '*';
    const MINUS = '-';
    const OP = [PLUS, MULTI, MINUS];
    
    let max = 0;
    
    const calc = (a, b, op) => {
        switch(op) {
            case PLUS:
                return a + b;
            case MINUS:
                return a - b;
            case MULTI:
                return a * b;
        }
    }
    
    const doCalc = (exp, op) => {
        const expCopy = [exp[0]];
        let n = exp.length;
        for (let i = 1; i < n; i+= 2) {
            const prev = expCopy.pop();
            if (exp[i] === op) {
                expCopy.push(calc(prev, exp[i + 1], op));
            } else {
                expCopy.push(prev);
                expCopy.push(exp[i]);
                expCopy.push(exp[i + 1]);
            }
        }
        return expCopy
    }
	
    const combi = (d, order, visited) => {
        if (d === 3) {
			max = Math.max(max, Math.abs(order.map(x=>OP[x]).reduce(doCalc, expressionArr)[0]));
            return;
        }
        for (let i = 0; i < 3; i++) if (!(visited & 1 << i)) combi(d + 1, [...order, i], visited | 1 << i);
    }
    
    combi(0, [], 0);
    
    return max;
}