

/* eslint-disable no-param-reassign */
import GlobalSettingSource from '../source/global-setting';
import AccountRuleModel from '@model/account-rule';

export default {
    fetchAllNameRule (params, payload) {
        return GlobalSettingSource.getAllNameRule(params, payload)
            .then(({ data }) => {
                let { currentRules, defaultRules } = data;
                if (currentRules.length < 1) {
                    currentRules = defaultRules;
                }
                currentRules = currentRules.map(item => new AccountRuleModel(item));
                defaultRules = defaultRules.map(item => new AccountRuleModel(item));
                return {
                    currentRules,
                    defaultRules,
                };
            });
    },
    updateNameRules (params, payload) {
        return GlobalSettingSource.updateNameRules(params, payload)
            .then(({ data }) => data);
    },
    fetchHistroyExpire (params, payload) {
        return GlobalSettingSource.getHistroyExpire(params, payload)
            .then(({ data }) => data);
    },
    updateHistroyExpire (params = {}) {
        return GlobalSettingSource.updateHistroyExpire(params)
            .then(({ data }) => data);
    },
    fetchAllUserBlacklist (params, payload) {
        return GlobalSettingSource.getAllUserBlacklist(params, payload)
            .then(({ data }) => data);
    },
    updateUserBlacklist (params, payload) {
        return GlobalSettingSource.updateUserBlacklist(params, payload);
    },
    fetchAllNotifyChannel (params, payload) {
        return GlobalSettingSource.getAllNotifyChannel(params, payload)
            .then(({ data }) => data);
    },
    fetchActiveNotifyChannel (params, payload) {
        return GlobalSettingSource.getAllNotifyChannel(params, payload)
            .then(({ data }) => data.filter(_ => _.isActive));
    },
    updateNotifyChannel (params = {}) {
        return GlobalSettingSource.updateNotifyChannel(params);
    },
    
    fetchUserList (params, payload) {
        return GlobalSettingSource.getUserByName(params, payload)
            .then(({ data }) => data);
    },
    fetchTitleAndFooterConfig (params, payload) {
        return GlobalSettingSource.getTitleAndFooterWithDefault(params, payload)
            .then(({ data }) => data);
    },
    updateTitleAndFooterConfig (params = {}) {
        return GlobalSettingSource.updateTitleAndFooterConfig(params);
    },
    fetchAllNotifyChannelConfig (params, payload) {
        return GlobalSettingSource.getAllNotifyChannelConfig(params, payload)
            .then(({ data }) => data);
    },
    fetchChannelTemplate (params, payload) {
        return GlobalSettingSource.getChannelTemplate(params, payload)
            .then(({ data }) => data);
    },
    updateNotifyTemplate (params = {}) {
        return GlobalSettingSource.updateNotifyTemplate(params)
            .then(({ data }) => data);
    },
    sendNotifyPreview (params = {}) {
        return GlobalSettingSource.sendNotifyPreview(params)
            .then(({ data }) => data);
    },
    fetchFileUpload (params) {
        return GlobalSettingSource.getFileUpload(params)
            .then(({ data }) => data);
    },
    saveFileUpload (params) {
        return GlobalSettingSource.saveFileUpload(params)
            .then(({ data }) => data);
    },
};
