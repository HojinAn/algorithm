function solution(w, h) {
    const gcd = (a, b) => !b ? a : gcd(b, a % b);
    const GCD = gcd(w, h);
    const min = Math.min(w, h) / GCD;
    const max = Math.max(w, h) / GCD;
    
    let cnt = Math.ceil(max / min);
    for (let i = 2; i <= min; i++) cnt += Math.ceil(max * i / min) - Math.floor(max * (i - 1) / min);
    return w * h - GCD * cnt;
}