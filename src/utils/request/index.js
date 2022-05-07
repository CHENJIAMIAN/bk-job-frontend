

import _ from 'lodash';
import {
    downloadUrl,
    buildURLParams,
} from '@utils/assist';
import Request from './lib/request';
import Cache from './lib/cache';

const request = new Request(Cache);

export default new Proxy(request, {
    get (target, key) {
        return (url, config = {}) => {
            if (key === 'download') {
                // eslint-disable-next-line  max-len
                downloadUrl(`${window.PROJECT_CONFIG.AJAX_URL_PREFIX}/${_.trim(url, '/')}?${buildURLParams(config.params)}`);
                return Promise.resolve();
            }
            return target.request({
                // baseUrl
                host: window.PROJECT_CONFIG.AJAX_URL_PREFIX,
                url,
                method: key,
                ...config,
            });
        };
    },
});
