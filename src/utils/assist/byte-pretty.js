

/**
 * @desc 字节数展示文本
 * @param { Number } value 字节数
 * @returns { String }
 */
export const bytePretty = (value) => {
    if (value === null || value === '' || value === 0) {
        return '0 Bytes';
    }
    const unitArr = [
        'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB',
    ];
    let index = 0;
    const srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    let size = srcsize / (1024 ** index);
    //  保留的小数位数
    size = size.toFixed(2);
    return size + unitArr[index];
};
