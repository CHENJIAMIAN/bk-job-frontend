

import BaseModel from './base';

export default class ScriptRelated extends BaseModel {
    constructor (payload) {
        super();
        this.appId = payload.appId;
        this.scopeType = payload.scopeType;
        this.scopeId = payload.scopeId;
        this.scriptStatus = payload.scriptStatus;
        this.scriptStatusDesc = payload.scriptStatusDesc;
        this.scriptVersion = payload.scriptVersion;
        this.taskTemplateId = payload.taskTemplateId || 0;
        this.taskTemplateName = payload.taskTemplateName;
        this.taskPlanId = payload.taskPlanId || 0;
        this.taskPlanName = payload.taskPlanName;
    }

    /**
     * @desc 同步状态 ICON
     * @returns { HTMLElement }
     */
    get statusHtml () {
        let styles = 'display: inline-block; padding: 0 8px; line-height: 18px; font-size: 12px; border-radius: 2px;';

        switch (this.status) {
            case ScriptRelated.STATUS_INVALID:
                styles += 'background: #F4E3C7; color: #FF9C01';
                break;
            case ScriptRelated.STATUS_ONLINE:
                styles += 'background: #DAEBDE; color: #3FC06D';
                break;
            default:
                styles += 'background: #F0F1F5; color: #979BA5';
        }
        return [
            `<span style="${styles}" data-script-status="${this.status}">`,
            ScriptRelated.STATUS_TEXT_MAP[this.scriptStatus],
            '</span>',
        ].join('');
    }
}
