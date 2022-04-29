

export default class DynamicGroupInfo {
    constructor (payload) {
        this.appId = payload.appId;
        this.scopeType = payload.scopeType;
        this.scopeId = payload.scopeId;
        this.appName = payload.appName;
        this.id = payload.id;
        this.owner = payload.owner;
        this.ownerName = payload.ownerName;
        this.name = payload.name;
        this.type = payload.type;
        this.ipList = payload.ipList || [];
        this.ipListStatus = payload.ipListStatus || [];
    }
}
