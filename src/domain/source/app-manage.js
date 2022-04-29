

import Request from '@utils/request';
import ModuleBase from './module-base';

class AppManage extends ModuleBase {
    constructor () {
        super();
        this.module = 'job-manage/web';
    }

    // 获取用户的业务列表
    getAllApp () {
        return Request.get(`/${this.module}/app/list`, {
            cache: true,
        });
    }

    // 获取完整的业务列表
    getWholeAppList () {
        return Request.get(`/${this.module}/app/list/favor`, {
            cache: true,
        });
    }

    // 收藏业务
    updateFavorApp (params = {}) {
        return Request.post(`${this.path}/favor`, {
            params,
        });
    }

    // 取消收藏业务
    updateCancelFavorApp (params = {}) {
        return Request.post(`${this.path}/cancelFavor`, {
            params,
        });
    }

    // 获取动态分组
    getAllDynamicGroup () {
        return Request.get(`${this.path}/dynamicGroup`, {
            cache: 2000,
        });
    }

    // 获取动态分组主机列表
    getHostByDynamicGroupId ({ id }) {
        return Request.get(`${this.path}/dynamicGroup/${id}`);
    }

    // 根据节点id获取机器列表
    getHostByNode (params) {
        return Request.post(`${this.path}/host/node`, {
            params,
        });
    }

    // 获取节点详情
    getNodeInfo (params = {}) {
        return Request.post(`${this.path}/node/detail`, {
            params,
        });
    }

    // 获取节点拓扑路径
    getNodePath (params = {}) {
        return Request.post(`${this.path}/node/queryPath`, {
            params,
        });
    }

    // 根据输入 IP 获取机器信息
    getHostByHost (params) {
        return Request.post(`${this.path}/ip/check`, {
            params,
        });
    }

    // 获取业务拓扑列表
    getAllTopology () {
        return Request.get(`${this.path}/topology`, {
            cache: 2000,
        });
    }

    // 获取业务拓扑列表（含各节点主机数）
    getAllTopologyWithCount () {
        return Request.get(`${this.path}/topology/hostCount`, {
            cache: 2000,
        });
    }

    // 获取业务拓扑主机列表（包含主机）
    getAllTopologyWithHost () {
        return Request.get(`${this.path}/topology/host`, {
            cache: 2000,
        });
    }

    // IP选择器根据拓扑节点集合获取机器列表(支持分页)
    getTopologyHost (params = {}) {
        return Request.post(`${this.path}/topology/hosts/nodes`, {
            params,
        });
    }

    // IP选择器根据拓扑节点集合获取机器列表（纯IP），返回IP格式为[cloudId:IP]
    getTopologyIPs (params = {}) {
        return Request.post(`${this.path}/topology/IPs/nodes`, {
            params,
        });
    }

    // IP选择器根据拓扑节点获取其子节点（仅获取一级，childs为空）
    getChildOfNode (params) {
        return Request.post(`${this.path}/topology/nodes/children`, {
            params,
        });
    }

    // 根据主机、拓扑节点、分组获取主机统计信息
    getHostStatistics (params = {}) {
        return Request.post(`${this.path}/host/statistics`, {
            params,
        });
    }
}

export default new AppManage();
