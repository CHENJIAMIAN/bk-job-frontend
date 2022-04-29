

import Model from '@model/model';

const AGENT_STATUS_SUCCESS = 9;
const AGENT_STATUS_RUNNING = 7;
const AGENT_STATUS_WAITING = 5;
const AGENT_STATUS_LAST_SUCCESS = 3;

export default class AgentTask extends Model {
    constructor (payload) {
        super();
        this.displayIp = payload.displayIp;
        this.endTime = payload.endTime;
        this.errorCode = payload.errorCode;
        this.exitCode = payload.exitCode;
        this.ip = payload.ip;
        this.retryCount = payload.retryCount || 0;
        this.startTime = payload.startTime;
        this.status = payload.status;
        this.statusDesc = payload.statusDesc;
        this.tag = payload.tag;
        this.totalTime = payload.totalTime;
        this.cloudAreaId = payload.cloudAreaId;
        this.cloudAreaName = payload.cloudAreaName;
    }

    /**
     * @desc 表示 agent 的唯一 key
     * @returns { String }
     */
    get key () {
        return `${this.cloudAreaId}:${this.displayIp}`;
    }

    /**
     * @desc agent 的状态
     * @returns { String }
     */
    get result () {
        if ([
            AGENT_STATUS_SUCCESS,
            AGENT_STATUS_LAST_SUCCESS,
        ].includes(this.status)) {
            return 'success';
        }
        if ([
            AGENT_STATUS_RUNNING,
        ].includes(this.status)) {
            return 'running';
        }
        if ([
            AGENT_STATUS_WAITING,
        ].includes(this.status)) {
            return 'waiting';
        }
        return 'fail';
    }
}
