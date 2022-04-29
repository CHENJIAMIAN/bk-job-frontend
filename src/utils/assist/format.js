

export const filterEmpty = params => Object.keys(params).reduce((result, key) => {
    if (params[key] !== '') {
    // eslint-disable-next-line no-param-reassign
        result[key] = params[key];
    }
    return result;
}, {});
