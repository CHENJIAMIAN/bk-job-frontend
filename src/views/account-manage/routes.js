

import I18n from '@/i18n';

export default {
    path: 'account',
    name: 'accountManage',
    component: () => import('@views/account-manage/index'),
    meta: {
        title: I18n.t('账号管理'),
        group: 'business',
    },
    redirect: {
        name: 'accountList',
    },
    children: [
        {
            path: 'list',
            name: 'accountList',
            component: () => import('@views/account-manage/index/index'),
            meta: {
                title: I18n.t('账号管理'),
                skeleton: 'list',
            },
        },
    ],
};
