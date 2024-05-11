export const getStrRoundedNumber = (value: number): string => {
    if(value >= 1000 && value < 1000000) {
        return getRoundedValue(value, 1000) + 'K';
    } else if(value >= 1000000) {
        return getRoundedValue(value, 1000000) + 'M';
    } else {
        return value.toString();
    }
}

function getRoundedValue(value: number, divisor: number) {
    return (value / divisor).toFixed(1).replace(/\.0+$/, '');
}
