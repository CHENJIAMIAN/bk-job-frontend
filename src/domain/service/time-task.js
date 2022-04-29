

/* eslint-disable no-param-reassign */
import TimeTaskSource from '../source/time-task';
import TaskPlanSource from '../source/task-plan';
import CrontabModel from '@model/crontab/crontab';

export default {
    timeTaskUpdate (params = {}) {
        return TimeTaskSource.update(params);
    },
    getDetail (params = {}, payload) {
        return TimeTaskSource.getDataById(params, payload)
            .then(({ data }) => new CrontabModel(data));
    },
    timeTaskDelete (params = {}) {
        return TimeTaskSource.deleteDataById(params);
    },
    timeTaskList (params, payload) {
        return TimeTaskSource.getAll(params, payload)
            .then(({ data }) => {
                data.data = data.data.map(item => new CrontabModel(item));
                
                const cronJobList = data.data;
                const planIds = cronJobList.map(item => item.taskPlanId).join(',');
                
                if (planIds.length > 0) {
                    // 获取定时任务的支持方案信息
                    TaskPlanSource.getPlansBasicInfo({ planIds })
                        .then((plansBasicInfo) => {
                            const planMap = {};
                            plansBasicInfo.data.forEach((item) => {
                                planMap[item.id] = item.name;
                            });
                            cronJobList.forEach((cronJob) => {
                                cronJob.isPlanLoading = false;
                                cronJob.taskPlanName = planMap[cronJob.taskPlanId];
                            });
                            return data;
                        });
                    // 获取定时任务的执行成功率信息
                    TimeTaskSource.getStatictis({
                        cronJobIds: cronJobList.map(item => item.id).join(','),
                    }).then((data) => {
                        const statictisMap = data.data.reduce((result, item) => {
                            result[item.id] = item;
                            return result;
                        }, {});
                        cronJobList.forEach((cronJob) => {
                            const {
                                lastExecuteStatus,
                                failCount,
                                totalCount,
                                lastFailRecord,
                            } = statictisMap[cronJob.id] || {};
                            cronJob.lastExecuteStatus = lastExecuteStatus;
                            cronJob.isStatictisLoading = false;
                            cronJob.failCount = failCount || 0;
                            cronJob.totalCount = totalCount || 0;
                            cronJob.lastFailRecord = Object.freeze(lastFailRecord || []);
                        });
                    });
                }
                
                return data;
            });
    },
    timeTaskStatusUpdate (params = {}) {
        return TimeTaskSource.updateStatus(params);
    },
    timeTaskCheckName (params = {}) {
        return TimeTaskSource.getCheckResult(params)
            .then(({ data }) => data);
    },
    updatePlanTask (params = {}) {
        return TimeTaskSource.updateVariableAndEnable(params)
            .then(({ data }) => data);
    },
    fetchTaskOfPlan (params = {}) {
        return TimeTaskSource.getDataByPlanId(params)
            .then(({ data }) => data.map(item => new CrontabModel(item)));
    },
    fetchTaskOfPlanBatch (params = {}) {
        return TimeTaskSource.getDataByPlanIds(params)
            .then(({ data }) => data);
    },
    fetchUnlaunchHistory (params) {
        return TimeTaskSource.getUnlaunchHistory(params)
            .then(({ data }) => data);
    },
};
