import moment from "moment";

export const generateWeek = () => {
    const startDate = moment().subtract(2, 'days');
    const endDate = moment().add(5, 'days');

    const week = [];
    let currentDate = startDate;
    while (currentDate.isBefore(endDate)) {
        week.push(currentDate.format("YYYY-MM-DD"));
        currentDate.add(1, 'days');
    }
    return week;
};