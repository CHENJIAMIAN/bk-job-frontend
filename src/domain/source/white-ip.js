

import Request from '@utils/request';

class WhiteIp {
    constructor () {
        this.module = '/job-manage/web/whiteIP';
    }

    // 新增/更新IP白名单
    update (params) {
        return Request.post(`${this.module}/`, {
            params,
        });
    }

    // 获取业务下云区域列表
    getAllCloudArea () {
        return Request.get(`${this.module}/cloudAreas/list`);
    }

    // 获取IP白名单记录详情
    getDataById ({ id }) {
        return Request.get(`${this.module}/ids/${id}`);
    }

    // 删除IP白名单
    deleteDataById ({ id }) {
        return Request.delete(`${this.module}/ids/${id}`);
    }

    // 获取IP白名单列表
    getAll (params, payload = {}) {
        return Request.get(`${this.module}/list`, {
            params,
            payload,
        });
    }

    // 获取生效范围列表
    getActionScope () {
        return Request.get(`${this.module}/actionScope/list`);
    }
}

export default new WhiteIp();
