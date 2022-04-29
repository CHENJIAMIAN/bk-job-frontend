

import Request from '@utils/request';
import ModuleBase from './module-base';

class TicketManage extends ModuleBase {
    constructor () {
        super();
        this.module = 'job-manage/web/credentials';
    }

    // 获取凭证列表
    getAll (params = {}) {
        return Request.get(`${this.path}/list`, {
            params,
        });
    }

    // 新建凭证
    update (params) {
        return Request.post(`${this.path}/`, {
            params,
        });
    }

    // 删除凭证
    delete ({ id }) {
        return Request.delete(`${this.path}/ids/${id}`);
    }
}

export default new TicketManage();
