

import _ from 'lodash';
import TaskInstanceDetailStepFileModel from '@model/execution/task-instance-detail-step-file';
import TaskInstanceDetailStepScriptModel from '@model/execution/task-instance-detail-step-script';

// 作业执行的步骤实例
export default class TaskInstanceDetailStep {
    constructor (payload) {
        this.id = payload.id || '';
        this.name = payload.name || '';
        this.type = payload.type;
        this.enable = Boolean(payload.enable);
        this.delete = payload.delete;
        this.approvalStepInfo = {};
        this.fileStepInfo = this.initFileStepInfo(payload.fileStepInfo);
        this.scriptStepInfo = this.initScriptStepInfo(payload.scriptStepInfo);
    }

    /**
     * @desc 处理作业的分发文件步骤
     * @param { Object } fileStepInfo
     * @returns { Object }
     */
    initFileStepInfo (fileStepInfo) {
        if (!_.isObject(fileStepInfo)) {
            return {};
        }
        return new TaskInstanceDetailStepFileModel(fileStepInfo);
    }

    /**
     * @desc 处理作业的执行脚本步骤
     * @param { Object } scriptStepInfo
     * @returns { Object }
     */
    initScriptStepInfo (scriptStepInfo) {
        if (!_.isObject(scriptStepInfo)) {
            return {};
        }
        return new TaskInstanceDetailStepScriptModel(scriptStepInfo);
    }
}
