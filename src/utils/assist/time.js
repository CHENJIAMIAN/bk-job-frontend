

export const prettyDateTimeFormat = (target) => {
    if (!target) {
        return '';
    }
    const formatStr = (str) => {
        if (String(str).length === 1) {
            return `0${str}`;
        }
        return str;
    };
    const d = new Date(target);
    const year = d.getFullYear();
    const month = formatStr(d.getMonth() + 1);
    const date = formatStr(d.getDate());
    const hours = formatStr(d.getHours());
    const minutes = formatStr(d.getMinutes());
    const seconds = formatStr(d.getSeconds());
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export const prettyDateFormat = (target) => {
    if (!target) {
        return '';
    }
    const formatStr = (str) => {
        if (String(str).length === 1) {
            return `0${str}`;
        }
        return str;
    };
    const d = new Date(target);
    const year = d.getFullYear();
    const month = formatStr(d.getMonth() + 1);
    const date = formatStr(d.getDate());
    return `${year}-${month}-${date}`;
};

export const generatorDefaultCronTime = () => {
    const nextHourDate = new Date(Date.now() + 3600000);
    const formatStr = (str) => {
        if (String(str).length === 1) {
            return `0${str}`;
        }
        return str;
    };
    const d = new Date(nextHourDate);
    const year = d.getFullYear();
    const month = formatStr(d.getMonth() + 1);
    const date = formatStr(d.getDate());
    const hours = formatStr(d.getHours());
    
    return `${year}-${month}-${date} ${hours}:00:00`;
};

export const transformTimeFriendly = (target) => {
    const totalTime = parseFloat(target);
    if (totalTime < 60) {
        return `${totalTime}s`;
    }
    const dayUnit = 86400;
    const hourUnit = 3600;
    const minUnit = 60;
    const stack = [];
    const day = Math.floor(target / dayUnit);
    if (day) {
        stack.push(`${day}d`);
    }
    const hour = Math.floor((target % dayUnit) / hourUnit);
    if (hour) {
        stack.push(`${hour}h`);
    }
    const min = Math.floor((target % hourUnit) / minUnit);
    if (min) {
        stack.push(`${min}m`);
    }
    const second = Math.ceil(target % 60);
    stack.push(`${second}s`);
    return stack.join(' ');
};
