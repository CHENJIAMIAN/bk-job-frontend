

import I18n from '@/i18n';

export default {
    path: 'script_manage',
    name: 'scriptManage',
    component: () => import('@views/script-manage/index'),
    redirect: {
        name: 'scriptList',
    },
    meta: {
        title: I18n.t('脚本管理'),
        group: 'business',
    },
    children: [
        {
            path: 'list',
            name: 'scriptList',
            component: () => import('@views/script-manage/list/'),
            meta: {
                pageTitle: I18n.t('脚本管理'),
                skeleton: 'taskList',
                full: true,
            },
        },
        {
            path: 'create',
            name: 'createScript',
            component: () => import('@views/script-manage/create/'),
            meta: {
                title: I18n.t('新建脚本'),
            },
        },
        {
            path: 'version/:id',
            name: 'scriptVersion',
            component: () => import('@views/script-manage/version'),
            meta: {
                title: I18n.t('版本管理'),
                skeleton: 'scriptVersion',
            },
        },
        {
            path: 'sync/:scriptId/:scriptVersionId',
            name: 'scriptSync',
            component: () => import('@views/script-manage/sync-confirm'),
            meta: {
                title: I18n.t('同步确认'),
            },
        },
        {
            path: 'sync_task/:scriptId/:scriptVersionId',
            name: 'scriptSyncTask',
            component: () => import('@views/script-manage/sync-task'),
            meta: {
                title: I18n.t('同步任务'),
            },
        },
    ],
};
