

import _ from 'lodash';
import I18n from '@/i18n';
import TaskStepModel from '@model/task/task-step';
import VariableModel from '@model/task/global-variable';

export const ipStatistics = (hostNodeList) => {
    const stack = [];
    if (hostNodeList.ipList.length > 0) {
        stack.push(`${hostNodeList.ipList.length}${I18n.t('template.个主机')}`);
    }
    if (hostNodeList.topoNodeList.length > 0) {
        stack.push(`${hostNodeList.topoNodeList.length}${I18n.t('template.个节点')}`);
    }
    if (hostNodeList.dynamicGroupList.length > 0) {
        stack.push(`${hostNodeList.dynamicGroupList.length}${I18n.t('template.个分组')}`);
    }
    
    return stack.join('，');
};

export const findStep = (target, id, type) => {
    const step = _.find(target, _ => _.realId === id);
    if (step) {
        return step;
    }
    return new TaskStepModel({
        approvalStepInfo: {},
        fileStepInfo: {},
        scriptStepInfo: {},
    });
};

export const findVariable = (target, name) => {
    const step = _.find(target, _ => _.name === name);
    if (step) {
        return step;
    }
    return new VariableModel({
        type: 3,
    });
};
