

import Request from '@utils/request';
import ModuleBase from './module-base';

class ServiceState extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web/serviceInfo';
    }

    // 获取所有服务信息
    getList (params = {}, payload = {}) {
        return Request.get(`${this.module}/listAll`, {
            params,
            payload,
        });
    }
}
export default new ServiceState();
