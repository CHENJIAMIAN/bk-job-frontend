

import _ from 'lodash';
import StepExecutionModel from '@model/execution/task-execution-result-step';
import TaskExecutionModel from '@model/execution/task-execution-result-task';

// 作业执行详情页面（包含作业执行状态、作业中步骤执行状态）
export default class TaskExecutionResult {
    constructor (payload) {
        this.finished = payload.finished;
        this.taskExecution = this.initTaskExecution(payload.taskExecution);
        this.stepExecution = this.initStepExecution(payload.stepExecution);
    }

    /**
     * @desc 作业包含的步骤总数
     * @returns { Number }
     */
    get totalStep () {
        return this.stepExecution.length || 0;
    }

    /**
     * @desc 正在执行的步骤的排序
     * @returns { Number }
     */
    get currentStepRunningOrder () {
        return _.findIndex(this.stepExecution, _ => _.currentStepRunning) + 1;
    }

    /**
     * @desc 处理作业的执行信息
     * @param { Object } taskInstance
     * @returns { Object }
     */
    initTaskExecution (taskInstance) {
        if (!taskInstance || !_.isObject(taskInstance)) {
            return Object.freeze(new TaskExecutionModel({}));
        }
        return Object.freeze(new TaskExecutionModel(taskInstance));
    }

    /**
     * @desc 处理作业包含的步骤执行信息
     * @param { Array } stepExecution
     * @returns { Array }
     */
    initStepExecution (stepExecution) {
        if (!stepExecution || !_.isArray(stepExecution)) {
            return [];
        }
        return stepExecution.map(_ => Object.freeze(new StepExecutionModel(_)));
    }
}
