

export default class NodeInfo {
    constructor (payload) {
        this.id = payload.id;
        this.name = payload.name;
        this.nodeType = payload.nodeType;
        this.ipList = payload.ipList || [];
        this.ipListStatus = payload.ipListStatus || [];
    }
}
