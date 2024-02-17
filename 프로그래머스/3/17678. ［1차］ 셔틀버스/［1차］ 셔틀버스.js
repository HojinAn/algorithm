const START_MINUTES = 540;

function solution(n, t, m, timetable) {
    timetable = timetable.map(timeStrToMinutes);
    const lastMin = START_MINUTES + (n - 1) * t;
    const availableTimetables = timetable.filter((time) => time <= lastMin).sort((a, b) => a - b);
	const arrivalTimetablesExceptLast = [...Array(n - 1)].map((_, i) => START_MINUTES + i * t);
    const restTimetables = arrivalTimetablesExceptLast.reduce((times, arrival) => {
        for (let i = 0; i < m; i++) {
            const firstTime = times.pop();
            if (!firstTime) {
                break;
            }
            if (firstTime > arrival) {
                times.push(firstTime);
                break;
            }
        }
        return times;
    }, availableTimetables.reverse()).reverse();
    
    if (restTimetables.length < m) {
        return minutesToTimeStr(lastMin);
    }
    const limit = Math.min(restTimetables.length, m);
    return minutesToTimeStr(restTimetables[limit - 1] - 1);
};

function timeStrToMinutes (str) {
    const [hh, mm] = str.split(':').map(Number);
    return (hh * 60) + mm;
}

function minutesToTimeStr (minutes) {
    return `${Math.floor(minutes / 60)}`.padStart(2, '0') + ':' + `${minutes % 60}`.padStart(2, '0');
}