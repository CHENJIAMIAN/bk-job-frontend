

import Request from '@utils/request';
import ModuleBase from './module-base';

class TagManage extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web/tag';
    }

    // 获取所有tag
    getAll (params = {}) {
        return Request.get(`${this.path}/tag/list`, {
            params,
            cache: 2000,
        });
    }

    getAllWithBasic (params = {}) {
        return Request.get(`${this.path}/tag/basic/list`, {
            params,
            cache: 2000,
        });
    }

    update (params = {}) {
        const realParams = { ...params };
        delete realParams.id;

        return Request.put(`${this.path}/tag/${params.id}`, {
            params: realParams,
        });
    }

    create (params = {}) {
        return Request.post(`${this.path}/tag`, {
            params,
        });
    }

    remove (params = {}) {
        return Request.delete(`${this.path}/tag/${params.id}`);
    }

    batchUpdate (params = {}) {
        const realParams = { ...params };
        delete realParams.id;

        return Request.put(`${this.path}/tag/${params.id}/resources`, {
            params: realParams,
        });
    }

    checkName (params = {}) {
        const realParams = { ...params };
        delete realParams.id;

        return Request.get(`${this.path}/tag/${params.id}/checkName`, {
            params: realParams,
        });
    }
}

export default new TagManage();
