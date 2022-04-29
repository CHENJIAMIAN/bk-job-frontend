

/**
 * @desc 正则表达式关键字符转换
 * @param { String } paramStr
 * @returns { String }
 */
export const encodeRegexp = (paramStr) => {
    const regexpKeyword = [
        '\\', '.', '*', '-', '{', '}', '[', ']', '^', '(', ')', '$', '+', '?', '|',
    ];
    const res = regexpKeyword.reduce(
        (result, charItem) => result.replace(new RegExp(`\\${charItem}`, 'g'), `\\${charItem}`),
        paramStr,
    );
    return res;
};

/**
 * @desc 多行文本处理
 * @param { String } text
 * @returns { String }
 */
export const encodeMult = (text) => {
    const temp = document.createElement('textarea');
    temp.value = text;
    return temp.value;
};
