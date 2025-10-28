function solution(n, w, num) {
    const slots = [...Array(w)].map(() => []);
    for (let i = 0; i < n; i++) {
        const quotient = Math.floor(i / w);
        const remain = i % w;
        const isOdd = quotient % 2 === 1;
        const idx = isOdd ? w - remain - 1 : remain;
        slots[idx].push(i + 1);
    }
    let t = 0;
    while (true) {
        t++;
        for (const slot of slots) {
            const no = slot.pop();
            if (no === num) {
                return t;
            }
        }
    }
}