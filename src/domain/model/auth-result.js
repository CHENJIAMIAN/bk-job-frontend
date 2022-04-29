

import _ from 'lodash';

export default class AuthResult {
    constructor (payload) {
        this.applyUrl = payload.applyUrl;
        this.pass = payload.pass;
        this.requiredPermissions = this.initRequiredPermission(payload.requiredPermissions);
    }

    initRequiredPermission (payload) {
        if (!_.isArray(payload)) {
            return [];
        }
        return payload.map(({ actionName, relatedResources }) => ({
            actionName: actionName || '--',
            relatedResources: relatedResources || [],
        }));
    }
}
