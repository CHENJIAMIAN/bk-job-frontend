

/* eslint-disable no-param-reassign */
import QueryGlobalSettingSource from '../source/query-global-setting';
import AccountRuleModel from '@model/account-rule';

export default {
    fetchAllNameRule () {
        return QueryGlobalSettingSource.getAllNameRule()
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
    fetchActiveNotifyChannel () {
        return QueryGlobalSettingSource.getAllNotifyChannel()
            .then(({ data }) => data.filter(_ => _.isActive));
    },
    fetchDangerousRules () {
        return QueryGlobalSettingSource.getAllDangerousRules()
            .then(({ data }) => data);
    },
    fetchAdminIdentity () {
        return QueryGlobalSettingSource.getAdminIdentity()
            .then(({ data }) => data);
    },
    fetchApplyBusinessUrl (params) {
        return QueryGlobalSettingSource.getApplyBusinessUrl(params)
            .then(({ data }) => data);
    },
    fetchCMDBAppIndexUrl () {
        return QueryGlobalSettingSource.getCMDBAppIndexUrl()
            .then(({ data }) => data);
    },
    fetchCMDBUrl () {
        return QueryGlobalSettingSource.getCMDBUrl()
            .then(({ data }) => data);
    },
    fetchFooterConfig () {
        return QueryGlobalSettingSource.getTitleAndFooter()
            .then(({ data }) => {
                const { footerLink, footerCopyRight } = data;
                return {
                    footerLink,
                    footerCopyRight,
                };
            });
    },
    fetchTitleConfig () {
        return QueryGlobalSettingSource.getTitleAndFooter()
            .then(({ data }) => {
                const { titleHead, titleSeparator } = data;
                return {
                    titleHead,
                    titleSeparator,
                };
            });
    },
    fetchRelatedSystemUrls () {
        return QueryGlobalSettingSource.getRelatedSystemUrls()
            .then(({ data }) => ({
                ...data,
                BK_CMDB_APP_INDEX_URL: data.BK_CMDB_APP_INDEX_URL.replace('{appId}', window.PROJECT_CONFIG.SCOPE_ID),
            }));
    },
    fetchJobConfig (params = {}) {
        return QueryGlobalSettingSource.getJobConfig(params)
            .then(({ data }) => data);
    },
};
