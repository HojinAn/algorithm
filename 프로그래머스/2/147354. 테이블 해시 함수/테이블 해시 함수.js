function solution(data, col, row_begin, row_end) {
    col--;
    return data.sort((a, b) => a[col] === b[col] ? b[0] - a[0] : a[col] - b[col]).map((row, i) => row.reduce((acc, no) => acc + (no % (i + 1)), 0)).slice(row_begin - 1, row_end).reduce((ans, s) => ans ^ s);
}