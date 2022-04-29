

/* eslint-disable no-param-reassign */
import NotifySource from '../source/notify';

export default {
    fetchBlacklist (params) {
        return NotifySource.getBlacklist(params)
            .then(({ data }) => data);
    },
    blacklistUpdate (params) {
        return NotifySource.updateBlacklist(params);
    },
    blacklistDelete (params) {
        return NotifySource.deleteBlacklistMember(params);
    },
    fetchPoliciesList (params) {
        return NotifySource.getPoliciesList(params)
            .then(({ data }) => data);
    },
    defaultPoliciesUpdate (params) {
        return NotifySource.updateDefaultPolicies(params);
    },
    fetchAllUsers (params = {}) {
        return NotifySource.getAllUsers(params)
            .then(({ data }) => data);
    },
    /**
     * @desc 用户搜索的用户列表
     * @param { String } prefixStr
     */
    fetchUsersOfSearch (prefixStr = '') {
        return NotifySource.getAllUsers({
            prefixStr,
            offset: 0,
            limit: 10,
        }).then(({ data }) => data.map(_ => ({
            id: _.englishName,
            name: _.englishName,
        })));
    },
    fetchPageTemplate () {
        return NotifySource.getPageTemplate()
            .then(({ data }) => data);
    },
    fetchAllChannel () {
        return NotifySource.getAllChannel()
            .then(({ data }) => data);
    },
    fetchAvailableChannel () {
        return NotifySource.getAvailableChannel()
            .then(({ data }) => data);
    },
    fetchRoleList () {
        return NotifySource.getAllRole()
            .then(({ data }) => data);
    },
};
