

import Request from '@utils/request';

class PubliceTagManage {
    constructor () {
        this.module = '/job-manage/web/public_tag';
    }

    // 获取所有tag
    getAll (params) {
        return Request.get(`${this.module}/list`, {
            params,
            cache: 2000,
        });
    }
}

export default new PubliceTagManage();
