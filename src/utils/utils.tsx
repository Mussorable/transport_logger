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

export const generateTimeFormat = (value: string) => {
    let restrictedValue = value.replace(/[^0-9]/g, '');
    if (!restrictedValue.includes(':') && restrictedValue.length > 2)
        restrictedValue = `${ restrictedValue.slice(0, 2) }:${ restrictedValue.slice(2) }`;

    if (restrictedValue.length > 5)
        return restrictedValue.slice(0, 5);

    if (parseInt(restrictedValue.slice(0, 2)) < 0 || parseInt(restrictedValue.slice(0, 2)) > 23)
        return `00:${ restrictedValue.slice(2) }`;
    if (parseInt(restrictedValue.slice(3, 5)) < 0 || parseInt(restrictedValue.slice(3, 5)) > 59)
        return `${ restrictedValue.slice(0, 2) }:00`;

    return restrictedValue ? restrictedValue : '';
};

export const handleBoolStateWithTimeout = (setState: (val: string | boolean) => void, timeout: number, initValue: string | boolean) => {
    setState(initValue);
    if (typeof initValue === 'boolean')
        setTimeout(() => setState(!initValue), timeout);
    else
        setTimeout(() => setState(false), timeout);
};