

const ERROR_MAP = {
    1: 'info',
    2: 'warning',
    3: 'error',
};
export default class ScriptError {
    constructor (payload) {
        this.row = payload.line - 1;
        this.column = 1;
        this.level = payload.level;
        this.type = ERROR_MAP[payload.level];
        this.text = this.initText(payload);
    }

    get isDangerous () {
        return this.level === 3;
    }

    initText (payload) {
        let text = '';
        if (this.level === 3) {
            text = `${'检测到代码存在高危语句：'}\n${payload.matchContent}\n\n${'详细说明：'}\n`;
        }
        return `${text}${payload.description}`;
    }
}
