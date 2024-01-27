function solution(my_string, queries) {
    return queries.reduce((strArr, [s, e]) => strArr.slice(0, s).concat(...strArr.slice(s, e + 1).reverse()).concat(...strArr.slice(e + 1)), [...my_string]).join('');
}