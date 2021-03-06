

/**
 * @desc 作业模板步骤模型
 *
*/
import _ from 'lodash';import Model from '@model/model';
import TaskScriptStep from '@model/task/task-script-step';
import TaskFileStep from '@model/task/task-file-step';
import TaskApprovalStep from '@model/task/task-approval-step';

const TYPE_SCRIPT = 1;
const TYPE_FILE = 2;
const TYPE_APPROVAL = 3;

export default class TaskStep extends Model {
    static TYPE_SCRIPT = TYPE_SCRIPT;
    static TYPE_FILE = TYPE_FILE;
    static TYPE_APPROVAL = TYPE_APPROVAL;

    static fileStep = TaskFileStep;
    static scriptStep = TaskScriptStep;
    static approvalStep = TaskApprovalStep;

    static typeTextMap = {
        [TYPE_SCRIPT]: '执行脚本',
        [TYPE_FILE]: '分发文件',
        [TYPE_APPROVAL]: '人工审核',
    };

    static iconMap = {
        [TYPE_SCRIPT]: 'script-5',
        [TYPE_FILE]: 'file',
        [TYPE_APPROVAL]: 'approval',
    };

    constructor (payload, isClone = false) {
        super();
        this.id = isClone ? -payload.id : payload.id;
        this.name = payload.name;
        this.type = payload.type || 0;
        this.delete = payload.delete || 0;
        this.enable = payload.enable || 0;
        this.templateStepId = payload.templateStepId || 0;
        this.refVariables = payload.refVariables || [];
        
        this.approvalStepInfo = this.initApprovalStepInfo(payload.approvalStepInfo);
        this.fileStepInfo = this.initFileStepInfo(payload.fileStepInfo);
        this.scriptStepInfo = this.initScriptStepInfo(payload.scriptStepInfo);
    }

    /**
     * @desc 步骤类型 ICON
     * @returns { String }
     */
    get icon () {
        return TaskStep.iconMap[this.type];
    }

    /**
     * @desc 步骤类型文本描述
     * @returns { String }
     */
    get typeText () {
        return TaskStep.typeTextMap[this.type];
    }

    /**
     * @desc 步骤状态 html
     * @returns { String }
     */
    get scriptStatusHtml () {
        return this.scriptStepInfo.scriptStatusHtml;
    }

    /**
     * @desc 执行脚本步骤——引用脚本需要更新
     * @returns { Boolean }
     */
    get isScriptNeedUpdate () {
        if (this.type !== TYPE_SCRIPT) {
            return false;
        }
        return this.scriptStepInfo.isNeedUpdate;
    }

    /**
     * @desc 执行脚本步骤——引用脚本本禁用
     * @returns { Boolean }
     */
    get isScriptDisabled () {
        if (this.type !== TYPE_SCRIPT) {
            return false;
        }
        return this.scriptStepInfo.isDisabled;
    }

    /**
     * @desc 脚本类型步骤
     * @returns { Boolean }
     */
    get isScript () {
        return this.type === TYPE_SCRIPT;
    }

    /**
     * @desc 分发文件类型步骤
     * @returns { Boolean }
     */
    get isFile () {
        return this.type === TYPE_FILE;
    }

    /**
     * @desc 人工审核类型步骤
     * @returns { Boolean }
     */
    get isApproval () {
        return this.type === TYPE_APPROVAL;
    }

    /**
     * @desc 初始化人工审核类型步骤
     * @param { Object } approvalStepInfo
     * @returns { Object }
     */
    initApprovalStepInfo (approvalStepInfo) {
        if (!_.isObject(approvalStepInfo)) {
            return {};
        }
        return new TaskApprovalStep(approvalStepInfo);
    }

    /**
     * @desc 初始化分发文件类型步骤
     * @param { Object } fileStepInfo
     * @returns { Object }
     */
    initFileStepInfo (fileStepInfo) {
        if (!_.isObject(fileStepInfo)) {
            return {};
        }
        return new TaskFileStep(fileStepInfo);
    }

    /**
     * @desc 初始化执行脚本类型步骤
     * @param { Object } scriptStepInfo
     * @returns { Object }
     */
    initScriptStepInfo (scriptStepInfo) {
        if (!_.isObject(scriptStepInfo)) {
            return {};
        }
        return new TaskScriptStep(scriptStepInfo);
    }
}
