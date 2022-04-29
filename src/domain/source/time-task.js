

import Request from '@utils/request';
import ModuleBase from './module-base';

class TimeTask extends ModuleBase {
    constructor () {
        super();
        this.module = '/job-crontab/web';
    }

    // 新增/更新定时任务
    update (params) {
        const { id } = params;
        return Request.put(`${this.path}/cron/job/${id}`, { params });
    }

    // 获取定时任务信息
    getDataById ({ id }, payload = {}) {
        return Request.get(`${this.path}/cron/job/${id}`, {
            payload,
        });
    }

    // // 删除定时任务
    deleteDataById ({ id }) {
        return Request.delete(`${this.path}/cron/job/${id}`);
    }

    // 定时任务列表
    getAll (params = {}, payload = {}) {
        return Request.get(`${this.path}/cron/job`, {
            params,
            payload,
        });
    }

    // 启用、禁用定时任务
    updateStatus (params) {
        const { id, enable } = params;
        return Request.put(`${this.path}/cron/job/${id}/status/?enable=${enable}`);
    }

    // 检查定时任务名称是否已占用
    getCheckResult (payload) {
        const params = { ...payload };
        delete params.id;
        return Request.get(`${this.path}/cron/job/${payload.id}/check_name`, {
            params,
        });
    }

    // 批量更新定时任务信息 只更新 变量 和 启用 字段
    updateVariableAndEnable (params) {
        return Request.post(`${this.path}/cron/job/batch_update`, {
            params,
        });
    }

    // 根据执行方案 ID 查询定时任务信息
    getDataByPlanId (params) {
        return Request.get(`${this.path}/cron/job/plan/${params.id}`);
    }

    // 根据执行方案 ID 列表批量查询定时任务信息
    getDataByPlanIds (params) {
        return Request.get(`${this.path}/cron/job/plans/${params.planIds}`);
    }

    // 获取定时执行成功率
    getStatictis (params = {}) {
        return Request.get(`${this.path}/cron/job/statistic`, {
            params,
        });
    }

    // 定时任务启动记录
    getUnlaunchHistory (params = {}) {
        const realParams = { ...params };
        delete realParams.cronTaskId;

        return Request.get(`${this.path}/cron/job/${params.cronTaskId}/history`, {
            params: realParams,
        });
    }
}

export default new TimeTask();
