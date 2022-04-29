

export const makeMap = (list) => {
    const map = Object.create(null);
    list.forEach((item) => {
        map[item] = true;
    });
    return map;
};
