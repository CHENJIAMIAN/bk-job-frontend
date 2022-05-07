

/* eslint-disable no-param-reassign */import Model from '@model/model';

const STATUS_ABNORMAL = 0; // 异常
const STATUS_NORMAL = 1; // 正常
const STATUS_UNKNOWN = 2; // 未知

const STORAGE_TYPE_OSS = 'OSS';
const STORAGE_TYPE_FILE_SYSTEM = 'FILE_SYSTEM';

export default class SourceFile extends Model {
    static STATUS_TEXT_MAP = {
        [STATUS_ABNORMAL]: '异常',
        [STATUS_NORMAL]: '正常',
        [STATUS_UNKNOWN]: '未知',
    };

    static STATUS_ICON_MAP = {
        [STATUS_ABNORMAL]: 'abnormal',
        [STATUS_NORMAL]: 'normal',
        [STATUS_UNKNOWN]: 'unknown',
    };

    static STORAGE_TYPE_MAP = {
        [STORAGE_TYPE_OSS]: '对象存储',
        [STORAGE_TYPE_FILE_SYSTEM]: '文件系统',
    };

    // 文件名前缀默认值
    static FILE_PERFIX_UUID = '${UUID}'; // 文件前缀：后台自动生成UUID

    constructor (payload) {
        super();
        this.id = payload.id;
        this.alias = payload.alias;
        this.appId = payload.appId;
        this.scopeType = payload.scopeType;
        this.scopeId = payload.scopeId;
        this.code = payload.code;
        this.createTime = payload.createTime;
        this.creator = payload.creator;
        this.credentialId = payload.credentialId;
        this.enable = payload.enable;
        this.filePrefix = payload.filePrefix;
        this.fileSourceInfoMap = payload.fileSourceInfoMap || {};
        this.fileSourceType = payload.fileSourceType || {};
        this.lastModifyTime = payload.lastModifyTime;
        this.lastModifyUser = payload.lastModifyUser;
        this.publicFlag = payload.publicFlag;
        this.shareToAllApp = payload.shareToAllApp;
        this.sharedAppIdList = payload.sharedAppIdList;
        this.status = payload.status;
        this.storageType = payload.storageType;
        this.workerId = payload.workerId;
        this.workerSelectMode = payload.workerSelectMode;
        this.workerSelectScope = payload.workerSelectScope;
        // 权限
        this.canManage = payload.canManage;
        this.canView = payload.canView;
    }

    /**
     * @desc 文件源访问是否正常
     * @returns { Boolean }
     */
    get isAvailable () {
        return this.status === STATUS_NORMAL;
    }

    /**
     * @desc 文件源状态展示文本
     * @returns { String }
     */
    get statusText () {
        return SourceFile.STATUS_TEXT_MAP[this.status];
    }

    /**
     * @desc 文件源状态显示 icon 名
     * @returns { String }
     */
    get statusIcon () {
        return SourceFile.STATUS_ICON_MAP[this.status];
    }

    /**
     * @desc 存储类型显示文本
     * @returns { String }
     */
    get storageTypeText () {
        return SourceFile.STORAGE_TYPE_MAP[this.storageType];
    }

    /**
     * @desc 公共文件源标识
     * @returns { String }
     */
    get publicFlagHtml () {
        let styles = 'display: inline-block; font-size: 12px; padding: 0 3px;';
        if (this.publicFlag) {
            styles += 'background: #EBF2FF; color: #699DF4;';
            return `<span style="${styles}" tippy-tips="${'公共存储'}">${'公'}</span>`;
        }
        styles += 'background: #F0F1F5; color: #979BA5;';
        return `<span style="${styles}" tippy-tips="${'私有存储'}">${'私'}</span>`;
    }
}
