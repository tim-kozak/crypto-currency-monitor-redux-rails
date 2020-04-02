import * as moment from 'moment';
const currencySumbol = "$";
const percentageSumbol = "%";

export const simpleValue = (value, precision = 2) => {
    return value.toFixed(precision);
};

export const simplePrice = (value, precision = 2) => {
    return currencySumbol + simpleValue(value,precision);
};

export const simplePercentage = (value, precision = 2) => {
    return simpleValue(value,precision) + percentageSumbol;
};

export const simpleDate = (value) => {
    const date = moment(value);
    const now = moment(new Date());
    const diff = now.diff(date, 'days')
        if (diff > 7 ) {
        return date.calendar(null, {
            sameElse: 'll'
        });
    } else {
        return date.fromNow();
    }
};

