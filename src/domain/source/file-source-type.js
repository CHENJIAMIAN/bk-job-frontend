

import Request from '@utils/request';
import ModuleBase from './module-base';

class FileSourceType extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-file-gateway/web/fileSourceType';
    }

    // 获取文件源类型列表
    getList (params = {}) {
        return Request.get(`${this.path}/list`, {
            params,
        });
    }
}
export default new FileSourceType();
