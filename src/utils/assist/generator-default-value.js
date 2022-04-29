

import Cookie from 'js-cookie';

export const defaultValue = value => value || '--';

/**
 * @desc 生成默认名称
 * @param { String } prefixStr 名称前缀
 * @returns { String }
 */
export const genDefaultName = (prefixStr = 'auto') => {
    const formatStr = (str) => {
        if (String(str).length === 1) {
            return `0${str}`;
        }
        return str;
    };
    const d = new Date();
    const month = d.getMonth() + 1;
    
    const temp = [
        d.getFullYear(),
        formatStr(month),
        formatStr(d.getDate()),
        formatStr(d.getHours()),
        formatStr(d.getMinutes()),
        formatStr(d.getSeconds()),
        d.getMilliseconds(),
    ];
    return `${prefixStr}_${temp.join('')}`;
};

/**
 * @desc 生成默认脚本版本号
 * @returns { String }
 */
export const genDefaultScriptVersion = () => {
    const uid = Cookie.get('job_user');
    const formatStr = (str) => {
        if (String(str).length === 1) {
            return `0${str}`;
        }
        return str;
    };
    const d = new Date();
    
    const month = formatStr(d.getMonth() + 1);
    const date = formatStr(d.getDate());
    const hours = formatStr(d.getHours());
    const minutes = formatStr(d.getMinutes());
    const seconds = formatStr(d.getSeconds());
    const millSeconds = formatStr(d.getMilliseconds());

    const temp = [
        d.getFullYear(),
        month,
        date,
        hours,
        minutes,
        seconds,
        millSeconds,
    ];
    
    return `${uid}.${temp.join('')}`.slice(0, 30);
};
