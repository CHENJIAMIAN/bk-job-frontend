

import Request from '@utils/request';
import ModuleBase from './module-base';

class QueryGlobalSetting extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web/queryGlobalSettings';
    }

    // 获取账号命名规则
    getAllNameRule () {
        return Request.get(`${this.module}/account/nameRules`);
    }

    // 获取通知渠道列表及生效状态
    getAllNotifyChannel () {
        return Request.get(`${this.module}/notify/listChannels`, {
            cache: 5000,
        });
    }

    // 获取高危语句规则列表
    getAllDangerousRules () {
        return Request.get(`${this.module}/security/dangerousRules/list`, {
            cache: 5000,
        });
    }

    // 判断用户是否为超级管理员
    getAdminIdentity () {
        return Request.get(`${this.module}/isAdmin`, {
            cache: true,
        });
    }

    // 获取页面申请业务地址
    getApplyBusinessUrl (params = {}) {
        return Request.get(`${this.module}/applyBusinessUrl`, {
            params,
        });
    }

    // 获取CMDB业务首页地址
    getCMDBAppIndexUrl () {
        return Request.get(`${this.path}/cmdbAppIndexUrl`);
    }

    // 获取CMDB服务跳转地址
    getCMDBUrl () {
        return Request.get(`${this.module}/cmdbServerUrl`);
    }

    // 获取Title与Footer
    getTitleAndFooter (params, payload) {
        return Request.get(`${this.module}/titleFooter`, {
            cache: true,
            ...payload,
        });
    }

    // 周边系统跳转路径
    getRelatedSystemUrls (params = {}) {
        return Request.get(`${this.module}/relatedSystemUrls`, {
            params,
            cache: true,
        });
    }

    // 公开配置
    getJobConfig (params = {}) {
        return Request.get(`${this.module}/jobConfig`, {
            params,
            cache: 3000,
        });
    }
}

export default new QueryGlobalSetting();
