
import Model from '@model/model';

export default class WhiteIp extends Model {
    constructor (payload) {
        super();
        this.actionScopeList = payload.actionScopeList;
        this.appList = payload.appList || [];
        this.cloudAreaId = payload.cloudAreaId;
        this.createTime = payload.createTime;
        this.creator = payload.creator;
        this.id = payload.id;
        this.ipList = payload.ipList || [];
        this.lastModifier = payload.lastModifier;
        this.lastModifyTime = payload.lastModifyTime;
        this.remark = payload.remark;
        this.canManage = payload.canManage;
    }

    get ip () {
        if (this.ipList.length < 2) {
            return this.ipList[0];
        }
        return `${'共'}${this.ipList.length}${'个'}`;
    }

    get scopeText () {
        return this.actionScopeList.map(item => item.name).join('，');
    }

    get appText () {
        return this.appList.map(_ => _.name).join('，');
    }
}
