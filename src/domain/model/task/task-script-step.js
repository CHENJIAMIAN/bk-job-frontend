

import I18n from '@/i18n';
import TaskHostNodeModel from '@model/task-host-node';

export default class TaskScriptStep {
    static STATUS_SCRIPT_NEED_UPDATE = 1;
    static STATUS_SCRIPT_DISABLED = 2;

    static TYPE_SOURCE_LOCAL = 1;
    static TYPE_SOURCE_BUSINESS = 2;
    static TYPE_SOURCE_PUBLIC = 3;

    constructor (payload = {}) {
        this.scriptId = payload.scriptId;
        this.ignoreError = payload.ignoreError || 0;
        this.scriptParam = payload.scriptParam || '';
        this.timeout = payload.timeout;
        this.scriptSource = payload.scriptSource;
        this.scriptVersionId = payload.scriptVersionId;
        this.secureParam = payload.secureParam;
        this.content = payload.content;
        this.scriptLanguage = payload.scriptLanguage || 1;
        this.account = payload.account;
        this.status = payload.status;
        this.executeTarget = new TaskHostNodeModel(payload.executeTarget || {});
    }

    get isReferPublicScript () {
        return this.scriptSource === TaskScriptStep.TYPE_SOURCE_PUBLIC;
    }

    get isDisabled () {
        return this.status === TaskScriptStep.STATUS_SCRIPT_DISABLED;
    }

    get isNeedUpdate () {
        return this.status === TaskScriptStep.STATUS_SCRIPT_NEED_UPDATE;
    }

    get scriptStatusHtml () {
        if (this.status === TaskScriptStep.STATUS_SCRIPT_NEED_UPDATE) {
        // eslint-disable-next-line max-len
            return `<i class="job-icon job-icon-script-update" tippy-tips="${I18n.t('引用脚本待更新')}" style="color: #EA3636"></i>`;
        }
        if (this.status === TaskScriptStep.STATUS_SCRIPT_DISABLED) {
        // eslint-disable-next-line max-len
            return `<i class="job-icon job-icon-script-disable" tippy-tips="${I18n.t('引用脚本被禁用')}" style="color: #EA3636"></i>`;
        }
        return '';
    }

    get scriptSourceText () {
        return this.scriptSource === TaskScriptStep.TYPE_SOURCE_LOCAL ? I18n.t('手工录入') : I18n.t('脚本引用');
    }

    get ignoreErrorText () {
        return this.ignoreError === 0 ? I18n.t('不忽略') : I18n.t('自动忽略错误');
    }
}
