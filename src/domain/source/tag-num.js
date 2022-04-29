

import Request from '@utils/request';
import ModuleBase from './module-base';

class TagNum extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web';
    }

    // 获取标签关联模板数量
    getNum (params = {}) {
        return Request.get(`${this.path}/task/template/tag/count`, {
            params,
        });
    }
}

export default new TagNum();
