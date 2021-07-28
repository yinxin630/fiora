export default {
    isToday(time1: Date, time2: Date) {
        return (
            time1.getFullYear() === time2.getFullYear() &&
            time1.getMonth() === time2.getMonth() &&
            time1.getDate() === time2.getDate()
        );
    },
    isYesterday(time1: Date, time2: Date) {
        const prevDate = new Date(time1);
        prevDate.setDate(time1.getDate() - 1);
        return (
            prevDate.getFullYear() === time2.getFullYear() &&
            prevDate.getMonth() === time2.getMonth() &&
            prevDate.getDate() === time2.getDate()
        );
    },
    getHourMinute(time: Date) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
        }`;
    },
    getMonthDate(time: Date) {
        return `${time.getMonth() + 1}/${time.getDate()}`;
    },
};
