

import I18n from '@/i18n';

export default {
    path: 'setting',
    name: 'globalSetting',
    component: () => import('@views/global-setting/'),
    meta: {
        title: I18n.t('全局设置'),
        group: 'manage',
    },
    redirect: {
        name: 'globalSettingIndex',
    },
    children: [
        {
            path: 'index',
            name: 'globalSettingIndex',
            component: () => import('@views/global-setting/index/index'),
            meta: {
                title: I18n.t('全局设置'),
                skeleton: 'globalSetUp',
            },
        },
    ],
};
