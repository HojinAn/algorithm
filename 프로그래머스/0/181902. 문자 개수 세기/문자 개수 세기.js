function solution(my_string) {
    return [...my_string].reduce((arr, str) => {
        const idx = str.toLowerCase() === str ? str.charCodeAt(0) - 71 : str.charCodeAt(0) - 65;
        arr[idx]++;
        return arr;
    }, Array(52).fill(0));
}