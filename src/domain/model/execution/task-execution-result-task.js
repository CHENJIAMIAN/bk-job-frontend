

import {
    transformTimeFriendly,
} from '@utils/assist';

const TASK_TYPE_TASK = 0;
const TASK_TYPE_SCRIPT = 1;
const TASK_TYPE_FILE = 2;

// 执行状态
const STATUS_PENDING = 1;
const STATUS_DOING = 2;
const STATUS_SUCCESS = 3;
const STATUS_FAIL = 4;
const STATUS_PASS = 5;
const STATUS_INGORE_ERROR = 6;
const STATUS_MANUAL_CONFIRM = 7;
const STATIS_MANUAL_END = 8;
const STATUS_STATE_EXCEPTION = 9;
const STATUS_FORCEDING = 10;
const STATUS_FORCED_SUCCESS = 11;
const STATUS_FORCED_FAIL = 12;
const STATUS_CONFIRM_FORCED = 13;
const STATUS_EVICTED = 14;

const checkStatus = (status) => {
    if ([
        STATUS_SUCCESS,
        STATUS_PASS,
        STATUS_INGORE_ERROR,
    ].includes(status)) {
        return 'success';
    }
    if ([
        STATUS_FAIL,
        STATUS_STATE_EXCEPTION,
        STATIS_MANUAL_END,
        STATUS_FORCED_FAIL,
    ].includes(status)) {
        return 'fail';
    }
    if ([
        STATUS_EVICTED,
    ].includes(status)) {
        return 'evicted';
    }
    if ([
        STATUS_FORCED_SUCCESS,
    ].includes(status)) {
        return 'forced';
    }
    if ([
        STATUS_DOING,
        STATUS_FORCEDING,
    ].includes(status)) {
        return 'loading';
    }
    if ([
        STATUS_MANUAL_CONFIRM,
    ].includes(status)) {
        return 'confirm';
    }
    if ([
        STATUS_CONFIRM_FORCED,
    ].includes(status)) {
        return 'confirmForced';
    }
    if ([
        STATUS_PENDING,
    ].includes(status)) {
        return 'disabled';
    }
    return 'disabled';
};

// 作业执行详情页
// 作业实例
export default class TaskExecutionResultStep {
    constructor (payload) {
        this.endTime = payload.endTime;
        this.name = payload.name;
        this.startTime = payload.startTime;
        this.status = payload.status;
        this.statusDesc = payload.statusDesc;
        this.taskInstanceId = payload.taskInstanceId;
        this.taskId = payload.taskId;
        this.totalTime = payload.totalTime;
        this.templateId = payload.templateId;
        this.type = payload.type;
        this.debugTask = payload.debugTask;
    }

    /**
     * @desc 是作业执行的任务
     * @returns { Boolean }
     */
    get isTask () {
        return this.type === TASK_TYPE_TASK;
    }

    /**
     * @desc 快速执行脚本的任务
     * @returns { Boolean }
     */
    get isScript () {
        return this.type === TASK_TYPE_SCRIPT;
    }

    /**
     * @desc 快速分发文件的任务
     * @returns { Boolean }
     */
    get isFile () {
        return this.type === TASK_TYPE_FILE;
    }

    /**
     * @desc 任务执行时间
     * @returns { String }
     */
    get totalTimeText () {
        return transformTimeFriendly(this.totalTime);
    }

    /**
     * @desc 任务正在执行
     * @returns { Boolean }
     */
    get isDoing () {
        return [
            STATUS_DOING,
            STATUS_FORCEDING,
        ].includes(this.status);
    }

    /**
     * @desc 任务执行成功
     * @returns { Boolean }
     */
    get isSuccess () {
        return [
            STATUS_SUCCESS,
        ].includes(this.status);
    }

    /**
     * @desc 任务可以被强制终止
     * @returns { Boolean }
     */
    get isForcedEnable () {
        return [
            STATUS_DOING,
        ].includes(this.status);
    }

    /**
     * @desc 任务状态的 css 对应的 class
     * @returns { String }
     */
    get displayStyle () {
        const styleMap = {
            success: 'success',
            ingore: 'ingore',
            fail: 'fail',
            forced: 'forced',
            forceding: 'loading',
            loading: 'loading',
            confirm: 'confirm',
            confirmForced: 'confirm-forced',
            disabled: 'disabled',
            evicted: 'fail',
        };
        return styleMap[checkStatus(this.status)];
    }
}
