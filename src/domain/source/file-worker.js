

import Request from '@utils/request';
import ModuleBase from './module-base';

class FileWorker extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-file-gateway/web/fileWorker';
    }

    // 获取文件接入点列表
    getList (params = {}) {
        return Request.get(`${this.path}/list`, {
            params,
        });
    }
}
export default new FileWorker();
