

import I18n from '@/i18n';
import { messageSuccess } from '@/common/bkmagic';

export * from './permission';
export * from './leave-confirm';
export * from './time';
export * from './url';
export * from './encode';
export * from './generator-default-value';
export * from './dom';
export * from './business';
export * from './script-error-alert';
export * from './byte-pretty';
export * from './format';
export * from './calc-text-width';

export const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);

export const formatScriptTypeValue = (value) => {
    const key = String(value).toLowerCase();
    const typeMap = {
        shell: 1,
        bat: 2,
        perl: 3,
        python: 4,
        powershell: 5,
        sql: 6,
        1: 'Shell',
        2: 'Bat',
        3: 'Perl',
        4: 'Python',
        5: 'Powershell',
        6: 'SQL',
    };
    return typeMap[key] || key;
};

export const execCopy = (value, message = I18n.t('复制成功')) => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = value;
    textarea.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        messageSuccess(message);
    }
    document.body.removeChild(textarea);
};

export const downloadUrl = (url) => {
    // 创建隐藏的可下载链接

    const eleLink = document.createElement('a');
    eleLink.style.display = 'none';
    eleLink.href = url;
    
    // 触发点击
    document.body.appendChild(eleLink);
    const { changeAlert } = window;
    window.changeAlert = false;
    eleLink.click();
    setTimeout(() => {
        window.changeAlert = changeAlert;
    });
    
    // 然后移除
    document.body.removeChild(eleLink);
};

export const formatNumber = (target, short = false) => {
    const format = val => `${val}`.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
    if (!short) {
        return format(target);
    }
    if (target < 10000) {
        return format(target);
    }
    if (target < 1000000) {
        return `${parseFloat(format(target / 1000), 2)} K`;
    }
    return `${parseFloat(format(target / 1000000), 2)} M`;
};
