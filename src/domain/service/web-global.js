

/* eslint-disable no-param-reassign */
import WebGlobalSource from '../source/web-global';

export default {
    fetchVersionLog () {
        return WebGlobalSource.getVersionLog()
            .then(({ data }) => Object.freeze(data));
    },
};
