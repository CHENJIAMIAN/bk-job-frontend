

export default class HostNodeInfo {
    constructor (payload = {}) {
        this.ipList = payload.ipList || [];
        this.topoNodeList = payload.topoNodeList || [];
        this.dynamicGroupList = payload.dynamicGroupList || [];
    }
}
