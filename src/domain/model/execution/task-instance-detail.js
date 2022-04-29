

import _ from 'lodash';
import TaskInstanceModel from '@model/execution/task-instance';
import TaskInstanceDetailStepMode from '@model/execution/task-instance-detail-step';

// 作业任务的实例信息
export default class TaskInstanceDetail {
    constructor (payload) {
        this.taskInstance = new TaskInstanceModel(payload.taskInstance || {});
        this.steps = this.initSteps(payload.steps);
        this.variables = this.initVariables(payload.variables);
    }

    /**
     * @desc 任务的步骤信息，默认第一个步骤
     * @returns { Object }
     */
    get stepInfo () {
        if (this.steps.length < 1) {
            return {};
        }
        return this.steps[0];
    }

    /**
     * @desc 处理任务的步骤数据
     * @param { Array } steps
     * @returns { Array }
     */
    initSteps (steps) {
        if (!_.isArray(steps)) {
            return [];
        }
        return steps.map(_ => new TaskInstanceDetailStepMode(_));
    }

    /**
     * @desc 处理任务的变量数据
     * @param { Array } variables
     * @returns { Array }
     */
    initVariables (variables) {
        if (!_.isArray(variables)) {
            return [];
        }
        return variables;
    }
}
