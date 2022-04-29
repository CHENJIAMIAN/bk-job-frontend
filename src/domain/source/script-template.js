

import Request from '@utils/request';

class ScriptTemplate {
    constructor () {
        this.module = 'job-manage/web/customSettings/scriptTemplate';
    }

    // 获取用户自定义的脚本模板
    getOriginalData (params = {}) {
        return Request.get(`${this.module}`, {
            params,
        });
    }

    // 保存用户自定义的脚本模板
    updateOriginalData (params = {}) {
        return Request.post(`${this.module}`, {
            params,
        });
    }

    // 渲染自定义的脚本模板
    getRenderDataWithVariable (params = {}) {
        return Request.post(`${this.module}/render`, {
            params,
        });
    }

    // 获取渲染后的用户自定义的脚本模板
    getData (params = {}) {
        return Request.get(`${this.module}/rendered`, {
            params: {
                ...params,
                // appId: window.PROJECT_CONFIG.APP_ID,
                scopeType: window.PROJECT_CONFIG.SCOPE_TYPE,
                scopeId: window.PROJECT_CONFIG.SCOPE_ID,
            },
        });
    }

    // 获取用户自定义的脚本模板变量
    getVariables (params = {}) {
        return Request.get(`${this.module}/variables`, {
            params,
        });
    }
}

export default new ScriptTemplate();
