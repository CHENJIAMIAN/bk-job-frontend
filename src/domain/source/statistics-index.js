

import Request from '@utils/request';
import ModuleBase from './module-base';

class StatisticsIndex extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-analysis/web/index';
    }

    // 获取分析结果列表
    getAnalysisResult () {
        return Request.get(`${this.path}/analysis/result/list`);
    }
}

export default new StatisticsIndex();
