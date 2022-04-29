

/* eslint-disable no-param-reassign */
import TaskManageSource from '../source/task-manage';
import TaskModel from '@model/task/task';

export default {
    taskList (params = {}) {
        return TaskManageSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(item => new TaskModel({
                    ...item,
                    canCreate: data.canCreate,
                }));
                return data;
            });
    },
    taskDetail (params, config) {
        return TaskManageSource.getDataById(params, config)
            .then(({ data }) => Object.freeze(new TaskModel(data)));
    },
    taskClone (params, config) {
        return TaskManageSource.getDataById(params, config)
            .then(({ data }) => {
                data.name = `${data.name}_copy`;
                return Object.freeze(new TaskModel(data, true));
            });
    },
    taskUpdate (params) {
        return TaskManageSource.update(params)
            .then(({ data }) => data);
    },
    taskDelete (params) {
        return TaskManageSource.deleteById(params);
    },
    taskUpdateBasic (params) {
        return TaskManageSource.updateBasic(params)
            .then(({ data }) => data);
    },
    taskUpdateFavorite (params) {
        return TaskManageSource.updateFavorite(params)
            .then(({ data }) => data);
    },
    taskDeleteFavorite (params) {
        return TaskManageSource.deleteFavorite(params)
            .then(({ data }) => data);
    },
    taskCheckName (params) {
        return TaskManageSource.getCheckResult(params)
            .then(({ data }) => data);
    },
    fetchBasic (params) {
        return TaskManageSource.getBasicById(params)
            .then(({ data }) => data.map(item => new TaskModel(item)));
    },
    batchUpdateTag (params = {}) {
        return TaskManageSource.batchUpdateTag(params)
            .then(({ data }) => data);
    },
    fetchTagCount (params = {}) {
        return TaskManageSource.getTagCount(params)
            .then(({ data }) => data);
    },
};
