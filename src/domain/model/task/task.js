

/**
 * @desc 作业模板
*/

import _ from 'lodash';import TagModel from '@model/tag';
import TaskStepModel from '@model/task/task-step';
import GlobalVariableModel from '@model/task/global-variable';

const STATUS_SCRIPT_NEED_UPDATE = 1;
const STATUS_SCRIPT_DISABLED = 2;
const STATUS_SCRIPT_NEED_UPDATE_AND_DISABLE = 3;

export default class Task {
    static STATUS_SCRIPT_NEED_UPDATE = STATUS_SCRIPT_NEED_UPDATE;
    static STATUS_SCRIPT_DISABLED = STATUS_SCRIPT_DISABLED;
    static STATUS_SCRIPT_NEED_UPDATE_AND_DISABLE = STATUS_SCRIPT_NEED_UPDATE_AND_DISABLE;
    
    constructor (payload, isClone = false) {
        this.id = isClone ? -payload.id : payload.id;
        this.name = payload.name;
        this.description = payload.description || '';
        this.favored = Boolean(payload.favored);
        this.scriptStatus = payload.scriptStatus;
        this.status = payload.status || 0;
        this.version = payload.version;
        this.createTime = payload.createTime;
        this.creator = payload.creator;
        this.lastModifyTime = payload.lastModifyTime;
        this.lastModifyUser = payload.lastModifyUser;
        
        this.stepList = this.initStepList(payload.stepList, isClone);
        this.tags = this.initTag(payload.tags);
        this.variables = this.initVariable(payload.variableList, isClone);

        // 作业模板权限
        this.canDebug = payload.canDebug;
        this.canDelete = payload.canDelete;
        this.canEdit = payload.canEdit;
        this.canView = payload.canView;
        this.canCreate = payload.canCreate;
    }

    /**
     * @desc 作业模板 tag 展示文本
     * @returns { String }
     */
    get tagText () {
        if (this.tags.length < 1) {
            return '--';
        }
        return this.tags.map(tag => tag.name).join('，');
    }

    /**
     * @desc 执行脚本步骤，引用的脚本状态展示标记
     * @returns { String }
     */
    get scriptStatusHtml () {
        const stack = [];
        if ([
            STATUS_SCRIPT_NEED_UPDATE,
            STATUS_SCRIPT_NEED_UPDATE_AND_DISABLE,
        ].includes(this.scriptStatus)) {
        // eslint-disable-next-line max-len
            stack.push(`<span tippy-tips="${'引用脚本待更新'}"><i class="job-icon job-icon-script-update"></i></span>`);
        }
        if ([
            STATUS_SCRIPT_DISABLED,
            STATUS_SCRIPT_NEED_UPDATE_AND_DISABLE,
        ].includes(this.scriptStatus)) {
        // eslint-disable-next-line max-len
            stack.push(`<span tippy-tips="${'引用脚本被禁用'}"><i class="job-icon job-icon-script-disable"></i></span>`);
        }
        return `<span style="color: #EA3636">${stack.join('')}</span>`;
    }

    /**
     * @desc 切换作业模板的收藏状态
     */
    toggleFavored () {
        this.favored = !this.favored;
    }

    /**
     * @desc 初始化模板步骤数据
     * @param { Array } payload
     * @param { Boolean } isClone
     * @returns { Array}
     */
    initStepList (payload, isClone) {
        if (!_.isArray(payload)) {
            return [];
        }
        return payload.map(item => new TaskStepModel(item, isClone));
    }

    /**
     * @desc 初始化模板 TAG 数据
     * @param { Array } payload
     * @returns { Array }
     */
    initTag (payload) {
        if (!_.isArray(payload)) {
            return [];
        }
        return payload.map(item => Object.freeze(new TagModel(item)));
    }

    /**
     * @desc 初始化模板全局变量数据
     * @param { Array } payload
     * @param { Boolean } isClone
     * @returns { Array }
     */
    initVariable (payload, isClone) {
        if (!_.isArray(payload)) {
            return [];
        }
        return payload.map(item => new GlobalVariableModel(item, isClone));
    }
}
