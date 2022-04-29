

import Request from '@utils/request';
import ModuleBase from './module-base';

class NotifyManage extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web/notify';
    }

    // 获取现有通知黑名单用户列表
    getBlacklist (params = {}) {
        return Request.get(`${this.module}/users/blacklist`, {
            params,
        });
    }

    // 更新通知黑名单
    updateBlacklist (params = {}) {
        return Request.post(`${this.module}/`, {
            params,
        });
    }

    // 删除黑名单成员
    deleteBlacklistMember (params = {}) {
        return Request.delete(`${this.module}/`, {
            params,
        });
    }

    // 获取业务通知策略列表
    getPoliciesList (params) {
        return Request.get(`${this.path}/policies/listDefault`, { params });
    }

    // 保存业务下默认通知策略
    updateDefaultPolicies (params = {}) {
        return Request.post(`${this.path}/saveAppDefaultPolicies`, { params });
    }

    // 拉取全量用户列表（不包括黑名单内用户）
    getAllUsers (params) {
        return Request.get(`${this.module}/users/list`, { params });
    }

    // 获取页面模板
    getPageTemplate () {
        return Request.get(`${this.module}/pageTemplate`);
    }

    // 获取ESB支持的所有通知渠道列表
    getAllChannel () {
        return Request.get(`${this.module}/notifyChannel/listAll`);
    }

    // 获取可用的通知渠道列表
    getAvailableChannel () {
        return Request.get(`${this.module}/notifyChannel/listAvailable`);
    }

    getAllRole () {
        return Request.get(`${this.module}/roles/list`);
    }
}

export default new NotifyManage();
