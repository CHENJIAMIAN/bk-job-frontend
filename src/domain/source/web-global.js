

import Request from '@utils/request';

class WebGlobal {
    getVersionLog () {
        return Request.get(`${window.location.origin}/static/bundledVersionLog.json`);
    }
}

export default new WebGlobal();
