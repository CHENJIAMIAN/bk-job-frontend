

export default class TaskApprovalStep {
    constructor (payload = {}) {
        this.approvalMessage = payload.approvalMessage;
        this.approvalType = payload.approvalType;
        this.notifyChannel = payload.notifyChannel || [];
        this.approvalUser = this.initApprobalUser(payload.approvalUser);
    }

    initApprobalUser (payload = {}) {
        return {
            roleList: payload.roleList || [],
            userList: payload.userList || [],
        };
    }
}
