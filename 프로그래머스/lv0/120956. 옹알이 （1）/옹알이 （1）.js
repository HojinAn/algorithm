function solution(babbling) {
    const AYA = 'aya';
    const WOO = 'woo';
    const YE = 'ye';
    const MA = 'ma';
    
    const isAvailable = (str) => {
        const {length} = str;
        for (let i = 0; i < length; i++) {
            const s2 = str.slice(i, i + 2);
            const s3 = str.slice(i, i + 3);
            if (s2 === YE || s2 === MA) {
                i++;
                continue;
            }
            if (s3 === AYA || s3 === WOO) {
                i += 2;
                continue;
            }
            return false;
        }
        return true;
    }
    
    return babbling.reduce((cnt, str) => cnt + (isAvailable(str) ? 1 : 0), 0);
}