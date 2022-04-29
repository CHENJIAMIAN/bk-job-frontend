

import I18n from '@/i18n';

export default {
    path: 'tag_manage',
    name: 'tagManage',
    component: () => import('@views/tag-manage/'),
    meta: {
        title: I18n.t('标签'),
        group: 'business',
    },
    redirect: {
        name: 'tagList',
    },
    children: [
        {
            path: 'index',
            name: 'tagList',
            component: () => import('@views/tag-manage/index/index'),
            meta: {
                title: I18n.t('标签'),
                skeleton: 'list',
            },
        },
    ],
};
