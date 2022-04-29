

/* eslint-disable no-param-reassign */
import DangerousRuleSource from '../source/dangerous-rule';

export default {
    fetchList (params = {}, payload = {}) {
        return DangerousRuleSource.getData(params, payload)
            .then(({ data }) => data);
    },
    update (params) {
        return DangerousRuleSource.update(params)
            .then(({ data }) => data);
    },
    remove (params) {
        return DangerousRuleSource.removeById(params)
            .then(({ data }) => data);
    },
    updateSort (params) {
        return DangerousRuleSource.move(params)
            .then(({ data }) => data);
    },
};
