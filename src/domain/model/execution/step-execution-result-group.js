

import _ from 'lodash';
import AgentTaskModel from '@model/execution/agent-task-execution';

const STATUS_PENDING = 5;
const STATUS_DOING = 7;

// 步骤执行详情页
// ——执行结果分组实例
export default class ResultGroup {
    constructor (payload) {
        this.resultType = payload.resultType;
        this.resultTypeDesc = payload.resultTypeDesc;
        this.tag = payload.tag || '';
        this.agentTaskExecutionDetail = this.initAgentTaskExecution(payload.agentTaskExecutionDetail);
        this.agentTaskSize = payload.agentTaskSize || 0;
    }
    
    /**
     * @desc 分组名
     * @returns { String }
     */
    get groupName () {
        let name = `${this.resultTypeDesc}`;
        if (this.tag) {
            name += `(${this.tag})`;
        }
        return name;
    }

    /**
     * @desc 最大长度的 tag (256)
     * @returns { Boolean }
     */
    get tagMaxLength () {
        return this.tag.length >= 256;
    }

    /**
     * @desc 分组结果的数据统计
     * @returns { Number }
     */
    get groupNums () {
        return this.agentTaskExecutionDetail.length;
    }

    /**
     * @desc 当前分组处于 loading 状态
     * @returns { Boolean }
     */
    get isLoading () {
        return [
            STATUS_PENDING,
            STATUS_DOING,
        ].includes(this.resultType);
    }

    /**
     * @desc 执行结果的 agent 实例
     * @param { Array } agentTaskExecutionDetail
     * @returns { Array }
     */
    initAgentTaskExecution = (agentTaskExecutionDetail) => {
        if (!_.isArray(agentTaskExecutionDetail)) {
            return [];
        }
        return agentTaskExecutionDetail.map(item => Object.freeze(new AgentTaskModel(item)));
    };
}
