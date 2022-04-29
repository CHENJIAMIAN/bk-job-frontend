

import _ from 'lodash';
import TaskHostNodeModel from '@model/task-host-node';

export default class CrontabVariable {
    constructor (payload) {
        this.id = payload.id;
        this.name = payload.name;
        this.type = payload.type;
        this.value = payload.value;
        this.targetValue = this.initTargetValue(payload.targetValue);
    }

    initTargetValue (targetValue) {
        if (!_.isObject(targetValue)) {
            return new TaskHostNodeModel({});
        }
        return new TaskHostNodeModel(targetValue);
    }
}
