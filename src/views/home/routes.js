

import I18n from '@/i18n';

export default {
    path: 'home',
    component: () => import('@views/home/index'),
    meta: {
        group: 'business',
    },
    children: [
        {
            path: '/',
            name: 'home',
            component: () => import('@views/home/index/index'),
            meta: {
                title: I18n.t('首页'),
            },
        },
    ],
};
