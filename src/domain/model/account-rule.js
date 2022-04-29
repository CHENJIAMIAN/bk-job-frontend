

import I18n from '@/i18n';

const OS_TYPE_LINUX = 1;
const OS_TYPE_WINDOWS = 2;
const OS_TYPE_DB = 3;

export default class AccountRule {
    constructor (payload) {
        this.osType = payload.osType;
        this.expression = payload.expression;
        this.description = payload.description;
    }

    /**
     * @desc 操作系统关键标识
     * @returns { String }
     */
    get osTypeKey () {
        const textMap = {
            [OS_TYPE_LINUX]: 'linux',
            [OS_TYPE_WINDOWS]: 'windows',
            [OS_TYPE_DB]: 'db',
        };
        return textMap[this.osType];
    }

    /**
     * @desc 操作系统类型显示文本
     * @returns { String }
     */
    get osTypeText () {
        const textMap = {
            [OS_TYPE_LINUX]: I18n.t('Linux 账号'),
            [OS_TYPE_WINDOWS]: I18n.t('Windows 账号'),
            [OS_TYPE_DB]: I18n.t('数据库账号'),
        };
        return textMap[this.osType];
    }
}
