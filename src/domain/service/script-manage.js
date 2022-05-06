

/* eslint-disable no-param-reassign */
import ScriptManageSource from '../source/script-manage';
import ScriptModel from '@model/script/script';
import ScriptErrorModel from '@model/script/script-error';
import ScriptSyncModel from '@model/script/script-sync';
import ScriptRelatedModel from '@model/script/script-related';

export default {
    scriptList (params, payload) {
        return ScriptManageSource.getAll(params, payload)
            .then(({ data }) => {
                data.data = data.data.map(script => Object.freeze(new ScriptModel(script)));
                return data;
            });
    },
    scriptDetail (params, config) {
        return ScriptManageSource.getDataByScriptId(params, config)
            .then(({ data }) => Object.freeze(new ScriptModel(data)));
    },
    scriptName (params) {
        return ScriptManageSource.getName(params)
            .then(({ data }) => data.map(item => ({
                id: item,
                name: item,
            })));
    },
    scriptVersionList (params, config) {
        return ScriptManageSource.getAllVersion(params, config)
            .then(({ data }) => data.map(script => Object.freeze(new ScriptModel(script))));
    },
    scriptUpdate (params) {
        return ScriptManageSource.update(params)
            .then(({ data }) => data);
    },
    scriptUpdateMeta (params) {
        return ScriptManageSource.updateMeta(params);
    },
    scriptDelete (params) {
        return ScriptManageSource.deleteById(params);
    },
    versionDetail (params, config) {
        return ScriptManageSource.getDataByVersionId(params, config)
            .then(({ data }) => new ScriptModel(data));
    },
    scriptVersionOnline (params) {
        return ScriptManageSource.updateVersionStatusOnline(params);
    },
    scriptVersionOffline (params) {
        return ScriptManageSource.updateVersionStatusOffline(params);
    },
    scriptVersionRemove (params) {
        return ScriptManageSource.deleteVersionByVersionId(params);
    },
    scriptTypeList () {
        return Promise.resolve([
            { id: 1, name: 'Shell' },
            { id: 2, name: 'Bat' },
            { id: 3, name: 'Perl' },
            { id: 4, name: 'Python' },
            { id: 5, name: 'Powershell' },
            { id: 6, name: 'SQL' },
        ]);
    },
    getScriptValidation (params) {
        return ScriptManageSource.getValidation(params)
            .then(({ data }) => data.map(item => new ScriptErrorModel(item)));
    },
    getUploadContent (params) {
        return ScriptManageSource.uploadGetContent(params)
            .then(({ data }) => Object.freeze(data));
    },
    getOnlineScriptList (params = {}) {
        return ScriptManageSource.getAllOnline(params)
            .then(({ data }) => data);
    },
    getOneOnlineScript (params = {}) {
        return ScriptManageSource.getOneOnlineByScriptId(params)
            .then(({ data }) => {
                if (data) {
                    return new ScriptModel(data);
                }
                return '';
            });
    },
    scriptRefTemplateSteps (params = {}) {
        return ScriptManageSource.getRefTemplateSteps(params)
            .then(({ data }) => data.map(script => Object.freeze(new ScriptSyncModel(script))));
    },
    scriptVersionSync (params = {}) {
        return ScriptManageSource.syncScriptVersion(params)
            .then(({ data }) => data.map(script => Object.freeze(new ScriptSyncModel(script))));
    },
    citeInfo (params) {
        return ScriptManageSource.getCiteInfo(params)
            .then(({ data }) => ({
                citedTaskPlanList: data.citedTaskPlanList.map(_ => new ScriptRelatedModel(_)),
                citedTemplateList: data.citedTemplateList.map(_ => new ScriptRelatedModel(_)),
            }));
    },
    fetchBasicInfo (params) {
        return ScriptManageSource.getBasiceInfoById(params)
            .then(({ data }) => new ScriptModel(data));
    },
    fetchBatchBasicInfo (params = {}) {
        return ScriptManageSource.getBatchBasiceInfoByIds(params)
            .then(({ data }) => data.map(item => new ScriptModel(item)));
    },
    batchUpdateTag (params = {}) {
        return ScriptManageSource.batchUpdateTag(params)
            .then(({ data }) => data);
    },
    // 获取业务下标签关联的脚本数量
    fetchTagCount (params = {}) {
        return ScriptManageSource.getTagCount(params)
            .then(({ data }) => data);
    },
};