

import I18n from '@/i18n';
import Model from '@model/model';

const APP_ID_SECRET_KEY = 'APP_ID_SECRET_KEY';
const PASSWORD = 'PASSWORD';
const USERNAME_PASSWORD = 'USERNAME_PASSWORD';
const SECRET_KEY = 'SECRET_KEY';

export default class Ticket extends Model {
    static VOUCHER_TYPE_MAP = {
        [APP_ID_SECRET_KEY]: I18n.t('AppID+SecretKey'),
        [PASSWORD]: I18n.t('单一密码'),
        [USERNAME_PASSWORD]: I18n.t('用户名+密码'),
        [SECRET_KEY]: I18n.t('单一SecretKey'),
    };

    constructor (payload) {
        super();
        this.description = payload.description;
        this.id = payload.id;
        this.name = payload.name;
        this.createTime = payload.createTime;
        this.creator = payload.creator;
        this.lastModifyTime = payload.lastModifyTime;
        this.lastModifyUser = payload.lastModifyUser;
        this.type = payload.type;
        this.value1 = payload.value1;
        this.value2 = payload.value2;
        this.value3 = payload.value3;
        this.relatedNums = payload.relatedNums || 0;
        // 权限
        this.canManage = payload.canManage;
        this.canUse = payload.canUse;
        // 异步获取引用数量
        this.isRelatedLoading = true;
    }
}
