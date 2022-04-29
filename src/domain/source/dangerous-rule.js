

import Request from '@utils/request';

class DangerousRule {
    constructor () {
        this.module = '/job-manage/web/dangerousRule';
    }

    // 获取高危语句规则列表
    getData (params = {}, payload = {}) {
        return Request.get(`${this.module}/list`, {
            params,
            payload,
        });
    }

    // 添加/修改高危语句规则
    update (params = {}) {
        return Request.post(`${this.module}`, {
            params,
        });
    }

    // 删除高危语句规则
    removeById (params = {}) {
        return Request.delete(`${this.module}/${params.id}`);
    }

    // 移动高危语句规则
    move (params = {}) {
        return Request.put(`${this.module}/move`, {
            params,
        });
    }
}
export default new DangerousRule();
