

// import I18n from '@/i18n'
import Model from '@model/model';

// const STATUS_ABNORMAL = 0 // 异常
// const STATUS_NORMAL = 1 // 正常
// const STATUS_UNKNOWN = -1 // 未知

export default class SeverState extends Model {
    constructor (payload) {
        super();
        this.name = payload.name;
        this.instanceList = payload.instanceList;
        this.version = payload.version || '--';
        this.versionConsistent = payload.versionConsistent;
    }

    get versionHtml () {
    /* eslint-disable max-len */
        return this.versionConsistent
            ? `<span>${this.version}</span>`
            : '<i class="job-icon job-icon-script-disable" style="color: #EA3636;" svg /><span style="color: #63656E;">存在不同版本</span>';
    }
}
