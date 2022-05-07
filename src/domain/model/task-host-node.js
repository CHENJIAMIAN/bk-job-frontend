

export default class TaskHostNode {
    static isHostNodeInfoEmpty (hostNodeInfo) {
        const { dynamicGroupList, ipList, topoNodeList } = hostNodeInfo;
        return dynamicGroupList.length < 1
            && ipList.length < 1
            && topoNodeList.length < 1;
    }
    
    constructor (payload = {}) {
        this.variable = payload.variable || '';
        this.hostNodeInfo = this.initHostNodeInfo(payload.hostNodeInfo || {});
    }
    
    get isEmpty () {
        const { dynamicGroupList, ipList, topoNodeList } = this.hostNodeInfo;
        return !this.variable
            && dynamicGroupList.length < 1
            && ipList.length < 1
            && topoNodeList.length < 1;
    }

    get text () {
        const { dynamicGroupList, ipList, topoNodeList } = this.hostNodeInfo;
        const strs = [];
        if (ipList.length > 0) {
            strs.push(`${ipList.length} ${'台主机'}`);
        }
        if (topoNodeList.length > 0) {
            strs.push(`${topoNodeList.length} ${'个节点'}`);
        }
        if (dynamicGroupList.length > 0) {
            strs.push(`${dynamicGroupList.length} ${'个分组'}`);
        }
        return strs.length > 0 ? strs.join('，') : '--';
    }

    initHostNodeInfo (hostNodeInfo) {
        const {
            ipList,
            dynamicGroupList,
            topoNodeList,
        } = hostNodeInfo;

        return Object.freeze({
            ipList: ipList || [],
            dynamicGroupList: dynamicGroupList || [],
            topoNodeList: topoNodeList || [],
        });
    }
}
