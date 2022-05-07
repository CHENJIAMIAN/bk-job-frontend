
import {
    prettyDateTimeFormat,
} from '@utils/assist';

export default class DangerousRecord {
    static scriptTypeMap = {
        1: 'Shell',
        2: 'Bat',
        3: 'Perl',
        4: 'Python',
        5: 'Powershell',
        6: 'Sql',
    };

    static actionMap = {
        1: `${'扫描'}`,
        2: `${'拦截'}`,
    };

    static startupModeMap = {
        1: 'Web',
        2: 'API',
        3: 'Cron',
    };

    constructor (payload) {
        this.action = payload.action;
        this.appId = payload.appId;
        this.scopeType = payload.scopeType;
        this.scopeId = payload.scopeId;
        this.appName = payload.appName;
        this.checkResultItems = payload.checkResultItems;
        this.client = payload.client;
        this.createTime = payload.createTime;
        this.id = payload.id;
        this.operator = payload.operator;
        this.ruleExpression = payload.ruleExpression;
        this.ruleId = payload.ruleId;
        this.scriptContent = payload.scriptContent;
        this.scriptLanguage = payload.scriptLanguage;
        this.startupMode = payload.startupMode;
    }

    get getSctiptTypeHtml () {
        return DangerousRecord.scriptTypeMap[this.scriptLanguage];
    }

    get getActionHtml () {
        let styles = 'display: inline-block; padding: 0 5px; line-height: 16px; font-size: 12px;';
        if (this.action === 1) {
            styles += 'background: #f0f1f5; color: #979ba5';
        } else {
            styles += 'background: #ffebeb; color: #ea3636';
        }
        return `<span style="${styles}">${DangerousRecord.actionMap[this.action]}<span>`;
    }

    get getCreatTimes () {
        return prettyDateTimeFormat(this.createTime);
    }

    get getStartupModeHtml () {
        return DangerousRecord.startupModeMap[this.startupMode];
    }
}
