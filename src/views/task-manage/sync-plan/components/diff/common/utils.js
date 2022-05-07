

import _ from 'lodash';import TaskStepModel from '@model/task/task-step';
import VariableModel from '@model/task/global-variable';

export const ipStatistics = (hostNodeList) => {
    const stack = [];
    if (hostNodeList.ipList.length > 0) {
        stack.push(`${hostNodeList.ipList.length}${'个主机'}`);
    }
    if (hostNodeList.topoNodeList.length > 0) {
        stack.push(`${hostNodeList.topoNodeList.length}${'个节点'}`);
    }
    if (hostNodeList.dynamicGroupList.length > 0) {
        stack.push(`${hostNodeList.dynamicGroupList.length}${'个分组'}`);
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
