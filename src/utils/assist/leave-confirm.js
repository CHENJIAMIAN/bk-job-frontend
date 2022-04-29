

import Vue from 'vue';
import I18n from '@/i18n';

/**
 * @desc 页面编辑状态未保存离开确认
 * @param { String } message
 * @returns { Promise }
 */
export const leaveConfirm = (message = I18n.t('离开将会导致未保存信息丢失')) => {
    if (!window.changeAlert || window.changeAlert === 'dialog') {
        return Promise.resolve(true);
    }
    const vm = new Vue();
    const h = vm.$createElement;
    return new Promise((resolve, reject) => {
        vm.$bkInfo({
            title: I18n.t('确认离开当前页？'),
            subHeader: h('p', {
                style: {
                    color: '#63656e',
                    fontSize: '14px',
                    textAlign: 'center',
                },
            }, message),
            confirmFn: () => {
                window.changeAlert = false;
                resolve(true);
            },
            cancelFn: () => {
                reject(Error('cancel'));
            },
        });
    });
};
