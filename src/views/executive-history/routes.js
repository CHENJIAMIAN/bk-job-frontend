

import I18n from '@/i18n';

export default {
    path: 'execute',
    name: 'executiveHistory',
    component: () => import('@views/executive-history'),
    redirect: {
        name: 'historyList',
    },
    meta: {
        title: I18n.t('执行历史'),
        group: 'business',
    },
    children: [
        {
            path: 'list',
            name: 'historyList',
            component: () => import('@views/executive-history/list'),
            meta: {
                pageTitle: I18n.t('执行历史'),
                skeleton: 'list',
            },
        },
        {
            path: 'task/:id',
            name: 'historyTask',
            component: () => import('@views/executive-history/task-detail'),
            meta: {
                title: I18n.t('作业执行详情'),
                skeleton: 'taskExecutiveDetail',
            },
        },
        {
            path: 'step/:taskInstanceId',
            name: 'historyStep',
            component: () => import('@views/executive-history/step-detail'),
            meta: {
                title: I18n.t('步骤执行详情'),
                full: true,
                skeleton: 'taskStepExecutiveDetail',
            },
        },
        {
            path: 'redo_task/:taskInstanceId',
            name: 'redoTask',
            component: () => import('@views/executive-history/redo-task'),
            meta: {
                title: I18n.t('重做执行方案'),
                skeleton: 'setVariable',
            },
        },
    ],
};
