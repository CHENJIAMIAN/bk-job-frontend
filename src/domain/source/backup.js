

import Request from '@utils/request';
import ModuleBase from './module-base';

class Backup extends ModuleBase {
    constructor () {
        super();
        this.module = 'job-backup/web';
    }

    // 获取当前用户的导入/导出任务列表
    getData () {
        return Request.get(`${this.path}/backup`);
    }

    // 开始导出
    export (params = {}) {
        return Request.post(`${this.path}/backup/export`, {
            params,
        });
    }

    // 获取导出任务信息
    getExportById (params = {}) {
        return Request.get(`${this.path}/backup/export/${params.id}`);
    }

    // 终止导出任务
    deleteExportById (params = {}) {
        return Request.delete(`${this.path}/backup/export/${params.id}`);
    }

    // 完成导出任务
    exportComplete (params = {}) {
        return Request.post(`${this.path}/backup/export/${params.id}/complete`, {
            params,
        });
    }

    // 获取导入信息
    getImportById (params = {}) {
        return Request.get(`${this.path}/backup/import/${params.id}`);
    }

    // 开始导入
    import (params = {}) {
        const bodyParams = {
            ...params,
        };
        delete bodyParams.id;
        return Request.post(`${this.path}/backup/import/${params.id}`, {
            params: bodyParams,
        });
    }

    // 导入校验密码
    checkImportPassword (params = {}) {
        const realParams = { ...params };
        delete realParams.id;
        return Request.post(`${this.path}/backup/import/${params.id}/password`, {
            params: realParams,
        });
    }

    // 获取导入文件信息
    putImportFile (params = {}, payload = {}) {
        return Request.post(`${this.path}/backup/import/file`, {
            params,
            payload: {
                ...payload,
                timeout: 0,
            },
        });
    }

    // 下载导出文件
    getImportFile (params = {}) {
        return Request.download(`${this.path}/backup/export/${params.id}/download`);
    }
}

export default new Backup();
