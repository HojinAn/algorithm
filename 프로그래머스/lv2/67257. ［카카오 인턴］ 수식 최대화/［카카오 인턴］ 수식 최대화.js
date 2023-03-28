function solution(expression) {
    const operators = expression.split(/\d+/g).filter(x=>x);
    const operands = expression.split(/\D/g);
    const len = operands.length;
    const expressionArr = [...operators.flatMap((op, i) => [+operands[i], op]), +operands[len - 1]];
    
    const PLUS = '+';
    const MULTI = '*';
    const MINUS = '-';
    const OP = [PLUS, MULTI, MINUS];
    
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
        const expCopy = [];
        let n = exp.length;
        for (let i = 1; i < n; i+= 2) {
            if (exp[i] === op) {
                expCopy.push(calc(exp[i - 1], exp[i + 1], op));
                n--;
            } else {
                expCopy.push(exp[i - 1]);
                expCopy.push(exp[i]);
            }
        }
        console.log(expCopy, op)
        return expCopy
    }
	
    const combi = (d, order, visited) => {
        if (d === 3) {
            console.log(order.map(x=>OP[x]).reduce(doCalc, expressionArr));
        }
        for (let i = 0; i < 3; i++) if (!(visited & 1 << i)) combi(d + 1, [...order, i], visited | 1 << i);
    }
    
    combi(0, [], 0);
}