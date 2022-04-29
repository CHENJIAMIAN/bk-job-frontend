

import Request from '@utils/request';
import ModuleBase from './module-base';

class AccountManage extends ModuleBase {
    constructor () {
        super();
        this.module = 'job-manage/web/account';
    }

    // 获取业务下的所有账号
    getWhole (params = {}) {
        return Request.get(`${this.path}/accounts`, {
            params,
            cache: 2000,
        });
    }

    // 获取用户的业务列表(分页)
    getAll (params = {}) {
        return Request.get(`${this.path}/accounts/page`, { params });
    }

    // 新增账号
    create (params) {
        return Request.post(`${this.path}/account`, {
            params,
        });
    }

    // 更新账号
    update (params) {
        return Request.put(`${this.path}/account`, {
            params,
        });
    }

    // 删除账号
    deleteById ({ id }) {
        return Request.delete(`${this.path}/account/${id}`);
    }

    // 获取账号详情
    getOne ({ id }) {
        return Request.get(`${this.path}/account${id}`);
    }
}

export default new AccountManage();
