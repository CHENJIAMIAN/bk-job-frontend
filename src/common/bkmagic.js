

import Vue from 'vue';
import PassLogin from '@blueking/paas-login';
import ApplyPermissionDialog from '@components/apply-permission/apply-dialog';
import {
    parseURL,
} from '@utils/assist';

// 全量引入
import './fully-import';

const Message = Vue.prototype.$bkMessage;

let messageInstance = null;
let loginInstance = null;

export const messageError = (message, callback, delay = 3000) => {
    messageInstance && messageInstance.close();
    messageInstance = Message({
        message,
        delay: callback ? 500 : delay,
        theme: 'error',
        onClose: callback,
        ellipsisLine: 0,
    });
};

export const messageSuccess = (message, callback, delay = 3000) => {
    messageInstance && messageInstance.close();
    messageInstance = Message({
        message,
        delay: callback ? 500 : delay,
        theme: 'success',
        onClose: callback,
    });
};

export const messageInfo = (message, callback, delay = 3000) => {
    messageInstance && messageInstance.close();
    messageInstance = Message({
        message,
        delay: callback ? 1500 : delay,
        theme: 'primary',
        onClose: callback,
    });
};

export const messageWarn = (message, callback, delay = 3000) => {
    messageInstance && messageInstance.close();
    messageInstance = Message({
        message,
        delay: callback ? 1500 : delay,
        theme: 'warning',
        hasCloseIcon: true,
        onClose: callback,
    });
};

export const loginDialog = (url) => {
    const generatorLoginUrl = (target) => {
        const urlInfo = parseURL(target);
        const { protocol, host, port, search, hash } = urlInfo;
        let { pathname } = urlInfo;

        let res = `${protocol}://${host}`;
        if (port) {
            res += `:${port}`;
        }
        pathname += 'plain/';
        res += pathname;
        
        if (search) {
            res += `?${search}`;
        }
        if (hash) {
            res += `#${hash}`;
        }
        return res;
    };
    
    const loginUrl = generatorLoginUrl(url);

    if (loginInstance) {
        return;
    }
    loginInstance = new Vue(PassLogin).$mount();
    loginInstance.loginUrl = loginUrl;
    loginInstance.successUrl = decodeURIComponent(`${window.location.origin}/static/login_success.html`);
    loginInstance.$nextTick(() => {
        document.body.appendChild(loginInstance.$el);
        loginInstance.show();
    });
};

let permissionInstance;

export const permissionDialog = (authParams = {}, authResult = {}) => {
    if (!permissionInstance) {
        permissionInstance = new Vue(ApplyPermissionDialog).$mount();
        permissionInstance.$watch(() => permissionInstance.isShowDialog, (isShowDialog) => {
            if (!isShowDialog) {
                document.body.removeChild(permissionInstance.$el);
            }
        });
    }
    permissionInstance.authParams = authParams;
    permissionInstance.authResult = authResult;
    permissionInstance.show();
    permissionInstance.$nextTick(() => {
        document.body.appendChild(permissionInstance.$el);
    });
};

Vue.prototype.messageError = messageError;
Vue.prototype.messageSuccess = messageSuccess;
Vue.prototype.messageInfo = messageInfo;
Vue.prototype.messageWarn = messageWarn;
