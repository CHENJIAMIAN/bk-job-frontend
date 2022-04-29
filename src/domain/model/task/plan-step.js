

import TaskStep from '@model/task/task-step';

/**
 * @desc 执行方案中步骤
 *
 * 继承 TaskStep
 *
 * 扩展字段：
 * enable —— 该步骤是否在执行方案中使用
 * templateStepId —— 该步骤对应的模板步骤id
*/
export default class ExecPlanStep extends TaskStep {
    constructor (payload) {
        super(payload);
        this.enable = payload.enable || 0;
        this.templateStepId = payload.templateStepId || 0;
    }
}
