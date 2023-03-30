function solution(jobs) {
    jobs.sort(([ta, sa], [tb, sb]) => ta === tb ? sb - sa : tb - ta);
    
    const waitingQ = [];
    let time = 0;
    let acc = 0;
    const len = jobs.length;
    
    while (jobs.length) {
        while (jobs.length && time >= jobs[jobs.length - 1][0]) waitingQ.push(jobs.pop());
        
        waitingQ.sort(([ta, sa], [tb, sb]) => sa === sb ? tb - ta : sb - sa);
        
        if (!waitingQ.length) time = jobs[jobs.length - 1][0];
        else {
            const [ct, cs] = waitingQ.pop();
            time += cs;
            acc += time - ct
        }
    }
    
	while (waitingQ.length) {
        const [ct, cs] = waitingQ.pop();
        time += cs;
        acc += time - ct;
    }
    
    return Math.floor(acc / len);
}