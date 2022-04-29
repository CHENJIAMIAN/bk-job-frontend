

/* eslint-disable no-param-reassign */
import FileSourceManageSource from '../source/file-source-manage';
import FileSourceModel from '@model/file/file-source';

export default {
    availableSourceList (params) {
        return FileSourceManageSource.getAvailableList(params)
            .then(({ data }) => {
                data.data = data.data.map(file => Object.freeze(new FileSourceModel(file)));
                return data;
            });
    },
    fetchAliasCheck (params = {}) {
        return FileSourceManageSource.getAliasCheck(params)
            .then(({ data }) => data);
    },
    fetchFileSourceList (params) {
        return FileSourceManageSource.getWorkTableList(params)
            .then(({ data }) => {
                data.data = data.data.map(file => Object.freeze(new FileSourceModel(file)));
                return data;
            });
    },
    addSource (params) {
        return FileSourceManageSource.addFileSource(params)
            .then(({ data }) => data);
    },
    updateSource (params) {
        return FileSourceManageSource.updateFileSource(params)
            .then(({ data }) => data);
    },
    getSourceInfo (params) {
        return FileSourceManageSource.getFileSourceInfo(params)
            .then(({ data }) => {
                data = Object.freeze(new FileSourceModel(data));
                return data;
            });
    },
    removeSource (params) {
        return FileSourceManageSource.removeFileSource(params)
            .then(({ data }) => data);
    },
    toggleSourceEnable (params) {
        return FileSourceManageSource.toggleEnable(params)
            .then(({ data }) => data);
    },
    fetchParams (params) {
        return FileSourceManageSource.getParams(params)
            .then(({ data }) => data);
    },
};
