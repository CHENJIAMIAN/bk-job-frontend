

import Cookie from 'js-cookie';
import enUS from './en-US';
import zhCN from './zh-CN';

const BLUEKINNG_LANGUAGE = 'blueking_language';

const languageMap = {
    'zh-CN': zhCN,
    'en-US': enUS,
};
let localeLanguage = 'zh-CN';
const bluekingLanguage = Cookie.get(BLUEKINNG_LANGUAGE);
if (bluekingLanguage && bluekingLanguage.toLowerCase() === 'en') {
    localeLanguage = 'en-US';
}

const languagePackage = languageMap[localeLanguage];

export default {
    t: (key) => {
        const keys = key.split('.');
        let i = 0;
        let value = languagePackage;
        while (i < keys.length) {
            value = value[keys[i]];
            i += 1;
        }
        return value;
    },
};
