/*
 * @Copyright (C) 2022 上腾忆想 All rights reserved
 * @Description: 无
 * @Created by: chenjiamian@tenpos.com
 * @LastEditTime: 2022-04-29 14:43:51
 */


const timeoutError = Symbol.for('timeout');
const timeout = (ms = 50) => new Promise((resolve, reject) => {
    setTimeout(() => reject(timeoutError), ms);
});
export default {
    install (Vue) {
    /* eslint-disable-next-line no-param-reassign */
        Vue.prototype.$request = (request, reject = () => {}, ms = 50) => Promise.race([
            request, timeout(ms),
        ]).catch((err) => {
            if (timeoutError === err) {
                reject(err);
                return request;
            }
            throw err;
        });
    },
};
