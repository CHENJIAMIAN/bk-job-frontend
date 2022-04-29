

import _ from 'lodash';

export default class ModuleBase {
    constructor () {
        this.module = '';
    }

    get path () {
        const {
            SCOPE_TYPE,
            SCOPE_ID,
        } = window.PROJECT_CONFIG;

        const moduleName = _.trim(this.module, '/');
        if (!SCOPE_TYPE || !SCOPE_ID) {
            return `/${moduleName}`;
        }
        if (!moduleName) {
            return `/scope/${SCOPE_TYPE}/${SCOPE_ID}`;
        }
        return `/${moduleName}/scope/${SCOPE_TYPE}/${SCOPE_ID}`;
    }
}
