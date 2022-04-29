

import Request from '@utils/request';
import ModuleBase from './module-base';

class Statistics extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-analysis/web/statistics';
    }

    // 查询某个统计量的分布信息
    getDistributionMetrics (params = {}) {
        const realParams = { ...params };
        delete realParams.metric;
        return Request.get(`${this.module}/distribution/metrics/${params.metric}`, {
            params: realParams,
        });
    }

    // 查询某个统计量的逐业务统计列表
    getListByPerAppMetrics (params = {}) {
        const realParams = { ...params };
        delete realParams.metric;
        return Request.get(`${this.module}/listByPerApp/metrics/${params.metric}`, {
            params: realParams,
        });
    }

    // 查询某种资源某个维度下的每日统计详情
    getReourcesDimensions (params = {}) {
        const realParams = { ...params };
        delete realParams.resource;
        delete realParams.dimension;
        return Request.get(`${this.module}/resources/${params.resource}/dimensions/${params.dimension}`, {
            params: realParams,
        });
    }

    // 查询某个统计量的统计信息
    getTotalMetrics (params = {}) {
        const realParams = { ...params };
        delete realParams.metric;
        return Request.get(`${this.module}/total/metrics/${params.metric}`, {
            params: realParams,
        });
    }

    // 查询某个统计量的趋势
    getTrendsMetrics (params = {}) {
        const realParams = { ...params };
        delete realParams.metric;
        return Request.get(`${this.module}/trends/metrics/${params.metric}`, {
            params: realParams,
        });
    }

    // 查询脚本引用统计信息
    getScriptCiteInfo (params = {}) {
        return Request.get(`${this.module}/script/citeInfo`, {
            params,
        });
    }

    // 查询统计数据起始日期
    getDateInfo (params = {}, payload = {}) {
        return Request.get(`${this.module}/info`, {
            params,
            payload,
        });
    }
}

export default new Statistics();
