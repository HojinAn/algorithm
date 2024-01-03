function solution(num_list) {
    const last = num_list.pop();
    const secondLast = num_list.pop();
    const ans = last <= secondLast ? 2 * last : last - secondLast;
    return num_list.concat(secondLast).concat(last).concat(ans);
}