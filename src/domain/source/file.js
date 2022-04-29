

import Request from '@utils/request';
import ModuleBase from './module-base';

class File extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-file-gateway/web/file';
    }

    // 获取文件源某个节点下的子节点列表
    getListFileNode (params = {}) {
        const realParams = { ...params };
        delete realParams.fileSourceId;

        return Request.get(`${this.path}/fileSourceIds/${params.fileSourceId}/listFileNode`, {
            params: realParams,
        });
    }

    // 子节点的操作
    updateAction (params = {}) {
        const realParams = { ...params };
        delete realParams.fileSourceId;
        return Request.post(`${this.path}/fileSourceIds/${params.fileSourceId}/executeAction`, {
            params: realParams,
        });
    }
}
export default new File();
