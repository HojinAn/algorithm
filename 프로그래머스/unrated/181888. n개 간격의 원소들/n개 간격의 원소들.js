function solution(num_list, n) {
    return num_list.reduce((arr, no, i) => {
        if (i % n) {
            return arr;
        }
        return [...arr, no];
    }, []);
}