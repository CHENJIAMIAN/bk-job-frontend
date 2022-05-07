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
