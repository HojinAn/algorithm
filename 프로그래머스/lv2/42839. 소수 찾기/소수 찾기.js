function solution(numbers) {
    const len = numbers.length;
    const nums = new Set();
    
    const facto = (length) => {
        const recur = (d, arr, visited) => {
            if (d === length) return nums.add(Number(arr.join('')))
            for (let i = 0; i < len; i++) {
                if (!(visited & 1 << i)) recur(d + 1, arr.concat(numbers[i]), visited | 1 << i);
            }
        }
        recur(0, []);
    } 
    for (let i = 1; i <= len; i++) facto(i);
    
    let cnt = 0;
    
    const isPrime = (no) => {
        if (no < 2) return false;
        if (no === 2) return true;
        if (no % 2 === 0) return false;
       	for (let i = 3; i * i <= no; i += 2) if (no % i === 0) return false;
        return true;
    }
    
    for (const no of nums) {
        isPrime(no) && cnt++;
    }
    
    return cnt;
}