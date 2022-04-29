

const STATUS_ONLINE = 1; // 已上线

export default class TaskPlan {
    constructor (payload) {
        this.templateId = payload.templateId;
        this.taskId = payload.taskId;
        this.taskName = payload.taskName;
        this.scriptId = payload.scriptId;
        this.scriptName = payload.scriptName;
        this.scriptStatus = payload.scriptStatus;
        this.scriptStatusDesc = payload.scriptStatusDesc;
        this.scriptVersion = payload.scriptVersion;
        this.scriptVersionId = payload.scriptVersionId;
    }

    get isOnline () {
        return [
            STATUS_ONLINE,
        ].includes(this.scriptStatus);
    }
}
