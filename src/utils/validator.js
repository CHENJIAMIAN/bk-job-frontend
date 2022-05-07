

export const scriptNameRule = {
    validator: value => /^[^\\|/:*<>"?]{1,60}$/.test(value),
    message: `${'不允许包含这些字符'}：\\ | / : * < > " ?`,
};

export const scriptVersionRule = {
    validator: value => /^[A-Za-z0-9\-_#@.]{1,30}$/.test(value),
    message: `${'只允许包含这些字符'}：A-Z a-z 0-9 _ - # @ .`,
};

export const taskTemplateName = {
    validator: value => /^[^\\|/:*<>"?]{1,60}$/.test(value),
    message: `${'不允许包含这些字符'}：\\ | / : * < > " ?`,
};

export const planNameRule = {
    validator: value => /^[^\\|/:*<>"?]{1,60}$/.test(value),
    message: `${'不允许包含这些字符'}：\\ | / : * < > " ?`,
};

export const timeTaskNameRule = {
    validator: value => /^[^\\|/:*<>"?]{1,60}$/.test(value),
    message: `${'不允许包含这些字符'}：\\ | / : * < > " ?`,
};

export const accountAliasNameRule = {
    validator: value => /^[^\\|/:*<>"?]{1,32}$/.test(value),
    message: `${'不允许包含这些字符'}：\\ | / : * < > " ?`,
};

export const filePathRule = {
    // eslint-disable-next-line max-len
    validator: value => /(^([a-z]|[A-Z]):(?=\\(?![\0-\37<>:"/\\|?*])|\/(?![\0-\37<>:"/\\|?*])|$)|^\\(?=[\\/][^\0-\37<>:"/\\|?*]+)|^(?=(\\|\/)$)|^\.(?=(\\|\/)$)|^\.\.(?=(\\|\/)$)|^(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+)|^\.\.(?=(\\|\/)[^\0-\37<>:"/\\|?*]+))((\\|\/)[^\0-\37<>:"/\\|?*]+|(\\|\/)$)*()|(^\/$|(^(?=\/)|^\.|^\.\.)(\/(?=[^/\0])[^/\0]+)*\/?)$/.test(value)
            || /^\$\{/.test(value),
    message: '目标路径格式错误',
};

export const tagNameRule = {
    validator: value => /^[\u4e00-\u9fa5A-Za-z0-9\-_!#@$&%^~=+.]{1,20}$/.test(value),
    message: '标签名支持：汉字 A-Z a-z 0-9 _ - ! # @ $ & % ^ ~ = + .',
};

export const globalVariableNameRule = {
    validator: value => /^[a-zA-Z_][0-9a-zA-Z_-]{0,29}$/.test(value),
    message: '变量名称：以英文字符、下划线开头；只允许英文字符、数字、下划线、和 -',
};

export const IPRule = {
    validator: value => /([0,1]?\d{1,2}|2([0-4][0-9]|5[0-5]))(\.([0,1]?\d{1,2}|2([0-4][0-9]|5[0-5]))){3}/.test(value),
    message: 'IP 格式不正确',
};

export const fileSourceAliasNameRule = {
    validator: value => /^[^\\|/:*<>"?]{1,32}$/.test(value),
    message: `${'不允许包含这些字符'}：\\ | / : * < > " ?`,
};
