

import I18n from '@/i18n';

export default {
    path: 'dashboard',
    component: () => import('@views/dashboard/index.vue'),
    meta: {
        group: 'operation',
    },
    children: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('@views/dashboard/index/index.vue'),
            meta: {
                title: I18n.t('运营视图'),
                full: true,
                skeleton: 'dashboard',
            },
        },
    ],
};
