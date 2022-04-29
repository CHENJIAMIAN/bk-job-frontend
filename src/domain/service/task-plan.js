

/* eslint-disable no-param-reassign */
import TaskPlanSource from '../source/task-plan';
import TaskModel from '@model/task/task';
import PlanModel from '@model/task/plan';
import VariableModel from '@model/task/global-variable';

export default {
    fetchAllPlan (params) {
        return TaskPlanSource.getAllPlan(params)
            .then(({ data }) => {
                data.data = data.data.map(item => new PlanModel(item));
                return data;
            });
    },
    fetchBatchPlan (params) {
        return TaskPlanSource.getPlansBasicInfo(params)
            .then(({ data }) => data.map(item => new PlanModel(item)));
    },
    fetchTaskPlan (params, config) {
        return TaskPlanSource.getAllPlanOfTemplate(params, config)
            .then(({ data }) => Object.freeze(data.map(item => new PlanModel(item))));
    },
    fetchBatchTaskPlan (params) {
        return TaskPlanSource.getAllTemplatePlan(params)
            .then(({ data }) => Object.freeze(data.map(item => new PlanModel(item))));
    },
    fetchPlanEditInfo (params) {
        return TaskPlanSource.getDetail(params)
            .then(({ data }) => new PlanModel(data));
    },
    fetchPlanDetailInfo (params, config) {
        return TaskPlanSource.getDetail(params, config)
            .then(({ data }) => new PlanModel(data));
    },
    fetchPlanVariable (params, payload) {
        return TaskPlanSource.getDetail(params, payload)
            .then(({ data }) => data.variableList.map(variable => new VariableModel(variable)));
    },
    fetchDebugPlanVariable (params, payload) {
        return TaskPlanSource.getDebugInfo(params, payload)
            .then(({ data }) => data.variableList.map(variable => new VariableModel(variable)));
    },
    fetchSyncInfo (params, payload) {
        return TaskPlanSource.getSyncDataById(params, payload)
            .then(({ data }) => {
                data.templateInfo = new TaskModel(data.templateInfo);
                data.planInfo = new PlanModel(data.planInfo);
                return data;
            });
    },
    planSyncInfo (params) {
        return TaskPlanSource.updateSyncInfo(params);
    },
    planUpdate (params) {
        return TaskPlanSource.update(params).then(({ data }) => data);
    },
    planDelete (params) {
        return TaskPlanSource.delete(params);
    },
    fetchDebugInfo (params, config) {
        return TaskPlanSource.getDebugInfo(params, config)
            .then(({ data }) => Object.freeze(new PlanModel(data)));
    },
    planCheckName (params) {
        return TaskPlanSource.getCheckResult(params)
            .then(({ data }) => data);
    },
    updateFavorite (params) {
        return TaskPlanSource.updateFavorite(params);
    },
    deleteFavorite (params) {
        return TaskPlanSource.deleteFavorite(params);
    },
    fetchPlanData (params) {
        return TaskPlanSource.getDataById(params)
            .then(({ data }) => data);
    },
    batchUpdateVariable (params) {
        return TaskPlanSource.batchUpdateVariable(params)
            .then(({ data }) => data);
    },
};
