

import _ from 'lodash';import TaskHostNodeModel from '@model/task-host-node';

const transferModeMap = {
    1: '严谨模式',
    2: '强制模式',
    3: '保险模式',
};

export default class TaskInstanceDetailStepFile {
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

    /**
     * @desc 上传限速展示文本
     * @returns { String }
     */
    get uploadSpeedLimitText () {
        if (this.uploadSpeedLimit < 1) {
            return '否';
        }
        return `${this.uploadSpeedLimit} (MB/s)`;
    }

    /**
     * @desc 下载限速展示文本
     * @returns { String }
     */
    get downloadSpeedLimitText () {
        if (this.downloadSpeedLimit < 1) {
            return '否';
        }
        return `${this.downloadSpeedLimit} (MB/s)`;
    }

    /**
     * @desc 忽略错误展示文本
     * @returns { String }
     */
    get ignoreErrorText () {
        return this.ignoreError === 0 ? '不忽略' : '自动忽略错误';
    }

    /**
     * @desc 传输模式展示文本
     * @returns { String }
     */
    get transferModeText () {
        return transferModeMap[this.transferMode];
    }

    /**
     * @desc 处理文件分发目标
     * @param { Object } fileDestination
     * @returns { Object }
     */
    initFileDestination (fileDestination) {
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

    /**
     * @desc 处理文件源
     * @param { Array } fileSourceList
     * @returns { Array }
     */
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
