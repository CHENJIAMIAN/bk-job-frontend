

/* eslint-disable no-param-reassign */
import PublicScriptManageSource from '../source/public-script-manage';
import ScriptModel from '@model/script/script';
import ScriptErrorModel from '@model/script/script-error';
import ScriptSyncModel from '@model/script/script-sync';
import ScriptRelatedModel from '@model/script/script-related';

export default {
    scriptList (params) {
        return PublicScriptManageSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(script => Object.freeze(new ScriptModel(script)));
                return data;
            });
    },
    scriptDetail (params) {
        return PublicScriptManageSource.getDataByScriptId(params)
            .then(({ data }) => Object.freeze(new ScriptModel(data)));
    },
    scriptName (params) {
        return PublicScriptManageSource.getName(params)
            .then(({ data }) => data.map(item => ({
                id: item,
                name: item,
            })));
    },
    scriptVersionList (params) {
        return PublicScriptManageSource.getAllVersion(params)
            .then(({ data }) => data.map(script => Object.freeze(new ScriptModel(script))));
    },
    scriptUpdate (params) {
        return PublicScriptManageSource.update(params)
            .then(({ data }) => data);
    },
    scriptUpdateMeta (params) {
        return PublicScriptManageSource.updateMeta(params)
            .then(({ data }) => data);
    },
    scriptDelete (params) {
        return PublicScriptManageSource.deleteById(params)
            .then(({ data }) => data);
    },
    versionDetail (params) {
        return PublicScriptManageSource.getDataByVersionId(params)
            .then(({ data }) => new ScriptModel(data));
    },
    scriptVersionOnline (params) {
        return PublicScriptManageSource.updateVersionStatusOnline(params);
    },
    scriptVersionOffline (params) {
        return PublicScriptManageSource.updateVersionStatusOffline(params);
    },
    scriptVersionRemove (params) {
        return PublicScriptManageSource.deleteVersionByVersionId(params);
    },
    scriptTypeList () {
        return Promise.resolve(Object.freeze([
            { id: 1, name: 'Shell' },
            { id: 2, name: 'Bat' },
            { id: 3, name: 'Perl' },
            { id: 4, name: 'Python' },
            { id: 5, name: 'Powershell' },
            { id: 6, name: 'SQL' },
        ]));
    },
    getScriptValidation (params) {
        return PublicScriptManageSource.getValidation(params)
            .then(({ data }) => data.map(item => new ScriptErrorModel(item)));
    },
    getUploadContent (params) {
        return PublicScriptManageSource.uploadGetContent(params)
            .then(({ data }) => Object.freeze(data));
    },
    getOnlineScriptList (params = {}) {
        return PublicScriptManageSource.getAllOnline(params)
            .then(({ data }) => data);
    },
    getOneOnlineScript (params = {}) {
        return PublicScriptManageSource.getOneOnlineByScriptId(params)
            .then(({ data }) => {
                if (data) {
                    return new ScriptModel(data);
                }
                return '';
            });
    },
    scriptRefTemplateSteps (params = {}) {
        return PublicScriptManageSource.getRefTemplateSteps(params)
            .then(({ data }) => data.map(script => Object.freeze(new ScriptSyncModel(script))));
    },
    scriptVersionSync (params = {}) {
        return PublicScriptManageSource.syncScriptVersion(params)
            .then(({ data }) => data.map(script => Object.freeze(new ScriptSyncModel(script))));
    },
    citeInfo (params) {
        return PublicScriptManageSource.getCiteInfo(params)
            .then(({ data }) => ({
                citedTaskPlanList: data.citedTaskPlanList.map(_ => new ScriptRelatedModel(_)),
                citedTemplateList: data.citedTemplateList.map(_ => new ScriptRelatedModel(_)),
            }));
    },
    fetchBasicInfo (params) {
        return PublicScriptManageSource.getBasiceInfoById(params)
            .then(({ data }) => new ScriptModel(data));
    },
    fetchBatchBasicInfo (params = {}) {
        return PublicScriptManageSource.getBatchBasiceInfoByIds(params)
            .then(({ data }) => data.map(item => new ScriptModel(item)));
    },
    batchUpdateTag (params = {}) {
        return PublicScriptManageSource.batchUpdateTag(params)
            .then(({ data }) => data);
    },
    // 获取业务下标签关联的脚本数量
    fetchTagCount (params = {}) {
        return PublicScriptManageSource.getTagCount(params)
            .then(({ data }) => data);
    },
};
