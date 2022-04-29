

import I18n from '@/i18n';

export default {
    path: 'plan_manage',
    name: 'planManage',
    component: () => import('@views/plan-manage'),
    redirect: {
        name: 'planList',
    },
    meta: {
        title: I18n.t('执行方案'),
        group: 'business',
    },
    children: [
        {
            path: 'list',
            name: 'planList',
            component: () => import('@views/task-manage/plan-list'),
            meta: {
                pageTitle: I18n.t('执行方案'),
                skeleton: 'list',
            },
        },
        {
            path: 'sync_plan_batch',
            name: 'syncPlanBatch',
            component: () => import('@views/task-manage/sync-plan-batch'),
            meta: {
                title: I18n.t('批量同步'),
                skeleton: 'list',
            },
        },
    ],
};
