

export const popperConfig = {
    arrow: false,
    placement: 'bottom-start',
    trigger: 'manual',
    theme: 'light bk-search-select-theme',
    hideOnClick: false,
    animateFill: false,
    animation: 'slide-toggle',
    lazy: false,
    ignoreAttributes: true,
    boundary: 'window',
    distance: 15,
    zIndex: window.__bk_zIndex_manager.nextZIndex(), // eslint-disable-line no-underscore-dangle
};

export const generatorMenu = () => ({
    id: null,
    checked: [],
    condition: {},
});

export const encodeRegexp = (param) => {
    const regexpKeyword = [
        '\\', '.', '*', '-', '{', '}', '[', ']', '^', '(', ')', '$', '+', '?', '|',
    ];
    const res = regexpKeyword.reduce((result, charItem) => {
        const reg = new RegExp(`\\${charItem}`, 'g');
        return result.replace(reg, `\\${charItem}`);
    }, param);
    return res;
};
