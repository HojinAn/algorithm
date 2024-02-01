function solution(book_time) {
    return book_time.map(([st, et]) => {
        const [sh, sm] = st.split(":").map(Number);
        const [eh, em] = et.split(":").map(Number);
        return [sh * 60 + sm, eh * 60 + em + 10];
    }).sort(comparator).reduce((pq, [st, et]) => {
        pq.sort();
        if (!pq.length) {
            pq.push(et);
        } else {
            const idx = pq.map((oldEt, i) => [st - oldEt, i]).filter(([t, i]) => t >= 0).sort(([t1], [t2]) => t1 - t2)[0]?.[1]
            if (idx === undefined || idx === -1) {
                pq.push(et);
            } else {
                pq.splice(idx, 1, et);
            }
        }
        return pq;
   }, []).length;
}

function comparator([st1, et1], [st2, et2]) {
    if (et1 === et2) {
        return st1 - st2;
    }
    return et1 - et2;
}