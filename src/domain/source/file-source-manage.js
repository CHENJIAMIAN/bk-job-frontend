

import Request from '@utils/request';
import ModuleBase from './module-base';

class FileSourceManage extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-file-gateway/web/fileSource';
    }

    // 获取可使用的文件源列表
    getAvailableList (params = {}) {
        return Request.get(`${this.path}/available/list`, {
            params,
        });
    }

    // 检查文件源别名是否已存在（可用返回true）
    getAliasCheck (params = {}) {
        const realParams = { ...params };
        delete realParams.alias;
        return Request.get(`${this.path}/checkAlias/${params.alias}`, {
            params: realParams,
        });
    }

    // 获取可管理的工作台文件源列表
    getWorkTableList (params = {}) {
        return Request.get(`${this.path}/workTable/list`, {
            params,
        });
    }

    // 新增文件源
    addFileSource (params) {
        return Request.post(`${this.path}`, {
            params,
        });
    }

    // 更新文件源
    updateFileSource (params) {
        return Request.put(`${this.path}`, {
            params,
        });
    }

    // 获取文件源详情
    getFileSourceInfo ({ id }) {
        return Request.get(`${this.path}/ids/${id}`);
    }

    // 删除文件源
    removeFileSource (params) {
        return Request.delete(`${this.path}/ids/${params.id}`);
    }

    // 启用/禁用文件源
    toggleEnable (params = {}) {
        return Request.put(`${this.path}/ids/${params.id}/enable?flag=${params.flag}`);
    }

    getParams (params = {}) {
        return Request.get(`${this.path}/fileSourceParams`, {
            params,
        });
    }
}

export default new FileSourceManage();
