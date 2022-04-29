

import Request from '@utils/request';
import ModuleBase from './module-base';

class TaskManage extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web';
    }

    // 获取模板列表
    getAll (params) {
        return Request.get(`${this.path}/task/template/`, {
            params,
        });
    }

    // 根据模板id获取模板信息
    getDataById ({ id }, payload) {
        return Request.get(`${this.path}/task/template/${id}`, {
            payload,
        });
    }

    // 更新模板
    update (payload = {}) {
        const params = { ...payload };
        delete params.id;
        return Request.put(`${this.path}/task/template/${payload.id}`, {
            params,
        });
    }

    // 删除模板
    deleteById ({ id }) {
        return Request.delete(`${this.path}/task/template/${id}`);
    }

    // 更新模板元数据
    updateBasic (payload = {}) {
        const params = { ...payload };
        return Request.put(`${this.path}/task/template/${params.id}/basic`, {
            params,
        });
    }

    // 新增收藏
    updateFavorite (payload = {}) {
        const params = { ...payload };
        return Request.put(`${this.path}/task/template/${params.id}/favorite`);
    }

    // 删除收藏
    deleteFavorite (payload = {}) {
        const params = { ...payload };
        return Request.delete(`${this.path}/task/template/${params.id}/favorite`);
    }

    // 检查作业模板名称是否已占用
    getCheckResult (payload) {
        const params = { ...payload };
        delete params.id;
        return Request.get(`${this.path}/task/template/${payload.id}/check_name`, {
            params,
        });
    }

    // 根据ID获取作业模板
    getBasicById (params = {}) {
        return Request.get(`${this.path}/task/template/basic`, {
            params,
        });
    }

    // 批量更新 tag
    batchUpdateTag (params = {}) {
        return Request.put(`${this.path}/task/template/tag`, {
            params,
        });
    }

    // 获取业务下标签关联的模版数量
    getTagCount (params = {}) {
        return Request.get(`${this.path}/task/template/tag/count`, {
            params,
        });
    }
}

export default new TaskManage();
