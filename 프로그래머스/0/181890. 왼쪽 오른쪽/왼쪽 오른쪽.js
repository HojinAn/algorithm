function solution(str_list) {
    const lIdx = str_list.indexOf('l');
    const rIdx = str_list.indexOf('r');
    if (lIdx === -1 && rIdx === -1) {
        return [];
    }
    if (lIdx === -1) {
        return str_list.slice(rIdx + 1);
    }
    if (rIdx === -1) {
        return str_list.slice(0, lIdx);
    }
    if (lIdx < rIdx) {
        return str_list.slice(0, lIdx);
    }
    return str_list.slice(rIdx + 1);
}