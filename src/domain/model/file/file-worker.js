

import Model from '@model/model';
export default class FileWorker extends Model {
    constructor (payload) {
        super();
        this.appId = payload.appId;
        this.scopeType = payload.scopeType;
        this.scopeId = payload.scopeId;
        this.id = payload.id;
        this.innerIp = payload.innerIp;
        this.latency = payload.latency;
        this.onlineStatus = payload.onlineStatus;
    }

    get latencyHtml () {
        const styles = this.onlineStatus ? 'color: #ff9c01;' : 'color: #EA3636;';
        const contents = this.onlineStatus ? `${this.latency} ms` : '心跳超时';
        return `<span style="${styles}"> ${contents} </span>`;
    }
}
