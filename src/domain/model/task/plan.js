

import _ from 'lodash';
import PlanStepModel from '@model/task/plan-step';
import GlobalVariableModel from '@model/task/global-variable';

export default class Plan {
    constructor (payload) {
        this.id = payload.id;
        this.name = payload.name;
        this.appId = payload.appId;
        this.scopeType = payload.scopeType;
        this.scopeId = payload.scopeId;
        this.favored = Boolean(payload.favored);
        this.cronJobCount = payload.cronJobCount || 0;
        this.hasCronJob = Boolean(payload.hasCronJob);
        this.needUpdate = Boolean(payload.needUpdate);
        this.templateId = payload.templateId;
        this.templateName = payload.templateName;
        this.templateVersion = payload.templateVersion;
        this.version = payload.version;
        this.createTime = payload.createTime;
        this.creator = payload.creator;
        this.lastModifyTime = payload.lastModifyTime;
        this.lastModifyUser = payload.lastModifyUser;

        this.stepList = this.initStep(payload.stepList);
        this.variableList = this.initVariable(payload.variableList);

        // 权限
        this.canDelete = payload.canDelete;
        this.canEdit = payload.canEdit;
        this.canView = payload.canView;
    }

    // 执行方案中使用到的模板步骤
    get enableStepList () {
        return _.filter(this.stepList, item => item.enable);
    }

    // 所有使用到来模板步骤的id
    get enableStepId () {
        return this.stepList.reduce((result, step) => {
            if (step.enable) {
                result.push(step.id);
            }
            return result;
        }, []);
    }

    // 关联作业模板中的步骤数
    get templateStepNums () {
        return this.stepList.length;
    }

    // 执行方案中使用的到模板步骤数
    get enableStepNums () {
        const stepList = _.filter(this.stepList, item => item.enable);
        return stepList.length;
    }

    toggleFavored () {
        this.favored = !this.favored;
    }

    initStep (payload) {
        if (!Array.isArray(payload)) {
            return [];
        }
        return payload.map(item => new PlanStepModel(item));
    }
    
    initVariable (payload) {
        if (!Array.isArray(payload)) {
            return [];
        }
        return payload.map(item => new GlobalVariableModel(item));
    }
}
