

import _ from 'lodash';
import TaskStepModel from '@model/task/task-step';

export const findStepInfo = (target, id, type) => {
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
