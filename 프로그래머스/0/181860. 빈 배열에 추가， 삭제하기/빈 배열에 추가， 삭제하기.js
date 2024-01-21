function solution(arr, flag) {
    return flag.reduce((result, is, i) => {
        const no = arr[i];
        if (is) {
            for (let i = 0; i < no; i++) {
                result.push(no);
                result.push(no);
            }
            return result;
        }
        for (let i = 0; i < no; i++) {
            result.pop();
        }
        return result;
    }, []);
}