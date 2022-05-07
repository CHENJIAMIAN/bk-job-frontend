

import _ from 'lodash';import TaskHostNodeModel from '@model/task-host-node';

const transferModeMap = {
    1: '严谨模式',
    2: '强制模式',
    3: '保险模式',
};

export default class TaskFileStep {
    static TYPE_SERVER = 1;
    static TYPE_LOCAL = 2;
    static TYPE_SOURCE = 3;
    constructor (payload = {}) {
        this.timeout = payload.timeout;
        this.uploadSpeedLimit = payload.uploadSpeedLimit || 0;
        this.downloadSpeedLimit = payload.downloadSpeedLimit || 0;
        this.notExistPathHandler = payload.notExistPathHandler;
        this.duplicateHandler = payload.duplicateHandler;
        this.transferMode = payload.transferMode || 1;
        this.ignoreError = payload.ignoreError || 0;
        
        this.fileDestination = this.initFileDestination(payload.fileDestination);
        this.fileSourceList = this.initFileSourceList(payload.fileSourceList);
    }

    get uploadSpeedLimitText () {
        if (this.uploadSpeedLimit < 1) {
            return '否';
        }
        return `${this.uploadSpeedLimit} (MB/s)`;
    }

    get downloadSpeedLimitText () {
        if (this.downloadSpeedLimit < 1) {
            return '否';
        }
        return `${this.downloadSpeedLimit} (MB/s)`;
    }

    get ignoreErrorText () {
        return this.ignoreError === 0 ? '不忽略' : '自动忽略错误';
    }

    get transferModeText () {
        return transferModeMap[this.transferMode];
    }

    initFileDestination (fileDestination) {
        if (!_.isObject(fileDestination)) {
            return {
                account: '',
                path: '',
                server: new TaskHostNodeModel({}),
            };
        }
        const {
            account,
            path,
            server,
        } = fileDestination;
        return {
            account: account || '',
            path: path || '',
            server: new TaskHostNodeModel(server || {}),
        };
    }
    
    initFileSourceList (fileSourceList) {
        if (!_.isArray(fileSourceList)) {
            return [];
        }
        return fileSourceList.map(item => ({
            id: item.id,
            fileType: item.fileType,
            fileLocation: item.fileLocation || [],
            fileHash: item.fileHash,
            fileSize: parseInt(item.fileSize, 10) || 0,
            fileSourceId: item.fileSourceId || 0,
            host: new TaskHostNodeModel(item.host || {}),
            account: item.account || 0,
        }));
    }
}
