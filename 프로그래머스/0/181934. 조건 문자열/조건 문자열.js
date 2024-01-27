const operators = {
    '<': {
        '=': (n, m) => n <= m ? 1 : 0,
        '!': (n, m) => n < m ? 1 : 0,
    },
    '>': {
        '=': (n, m) => n >= m ? 1 : 0,
        '!': (n, m) => n > m ? 1 : 0,
    }
}
function solution(ineq, eq, n, m) {
    return operators[ineq][eq](n, m);
}