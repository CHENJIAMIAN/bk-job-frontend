

import Request from '@utils/request';
import ModuleBase from './module-base';

class Home extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-manage/web/index';
    }

    // 获取问候语列表
    getAnalysisGreeting () {
        return Request.get(`${this.path}/analysis/greeting/list`);
    }

    // 获取我收藏的作业
    getMyFavorList () {
        return Request.get(`${this.path}/jobs/myFavorList`);
    }

    // 获取Agent统计数据
    getStatisticsAgent () {
        return Request.get(`${this.path}/statistics/agent`);
    }

    // 获取作业与脚本统计数据
    getStatisticsJobAndScript () {
        return Request.get(`${this.path}/statistics/jobAndScript`);
    }

    // 根据agent状态获取分页主机列表
    getAgentStatusList (params) {
        return Request.get(`${this.path}/hosts/agentStatus/${params.agentStatus}`, {
            params: {
                start: params.start,
                pageSize: params.pageSize,
            },
        });
    }

    // 根据agent状态获取全量主机列表
    getAllAgentStatusList (params) {
        const { agentStatus } = params;
        return Request.get(`${this.path}/IPs/agentStatus/${agentStatus}`);
    }
}

export default new Home();
