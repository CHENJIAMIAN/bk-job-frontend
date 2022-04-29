

const STATUS_FAIL_RETRY = 1;
const STATUS_ALL_RETRY = 5;

// 步骤执行过程中的操作记录
export default class OperationLog {
    constructor (payload) {
        this.id = payload.id;
        this.taskInstanceId = payload.taskInstanceId;
        this.operator = payload.operator;
        this.operationName = payload.operationName;
        this.operationCode = payload.operationCode;
        this.stepInstanceId = payload.stepInstanceId;
        this.retry = payload.retry || 0;
        this.stepName = payload.stepName;
        this.createTime = payload.createTime;
        this.detail = payload.detail;
    }

    /**
     * @desc 该记录支持查看详情
     * @returns { Boolean }
     */
    get detailEnable () {
        return [
            STATUS_FAIL_RETRY,
            STATUS_ALL_RETRY,
        ].includes(this.operationCode);
    }
}
