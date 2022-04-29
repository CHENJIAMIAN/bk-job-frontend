

import Request from '@utils/request';
import ModuleBase from './module-base';

class DangerousRecord extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-execute/web/dangerous-record';
    }

    getDangerousRecordList (params, payload = {}) {
        return Request.get(`${this.module}/list`, {
            params,
            payload,
        });
    }
}
export default new DangerousRecord();
