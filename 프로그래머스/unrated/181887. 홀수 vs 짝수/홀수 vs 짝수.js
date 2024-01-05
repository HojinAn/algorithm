function solution(num_list) {
    return Math.max(...num_list.reduce(([odd, even], n, i) => {
        if (i % 2) {
            return [odd, even + n];
        }
        return [odd + n, even]
    }, [0, 0]));
}