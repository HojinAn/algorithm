function solution(today, terms, privacies) {
    const termInfo = terms.reduce((info, term) => {
        const [type, period] = term.split(" ");
        return {
            ...info,
            [type]: +period,
        }
    }, {});
    return privacies.reduce((result, privacy, i) => {
        const [date, type] = privacy.split(" ");
        const expDate = calcExpDate(date, termInfo[type]);
        if (isExpired(today, expDate)) {
            result.push(i + 1);
        }
        return result;
    }, []);
}

function calcExpDate(date, month) {
    const [y, m, d] = date.split(".").map(Number);
    let M = m + month;
    const D = (() => {
        if (d === 1) {
            M--;
            return 28;
        }
        return d - 1;
    })();
    let Y = y;
    while (M > 12) {
        M -= 12;
        Y++;
    }
    return `${Y}.${M}.${D}`;
}

function isExpired(date, exp) {
    const [y, m, d] = date.split(".").map(Number);
    const [ey, em, ed] = exp.split(".").map(Number);
    if (y < ey) {
        return false;
    }
    if (y > ey) {
        return true;
    }
    if (m < em) {
        return false;
    }
    if (m > em) {
        return true;
    }
    if (d < ed) {
        return false;
    }
    if (d > ed) {
        return true;
    }
    return false;
}