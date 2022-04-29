

import I18n from '@/i18n';

export default {
    path: 'task_manage',
    name: 'taskManage',
    component: () => import('@views/task-manage'),
    redirect: {
        name: 'taskList',
    },
    meta: {
        title: I18n.t('作业'),
        group: 'business',
    },
    children: [
        {
            path: 'list',
            name: 'taskList',
            component: () => import('@views/task-manage/list'),
            meta: {
                pageTitle: I18n.t('作业'),
                full: true,
                skeleton: 'taskList',
            },
        },
        {
            path: 'detail/:id',
            name: 'templateDetail',
            component: () => import('@views/task-manage/template-detail'),
            meta: {
                title: I18n.t('查看作业模板'),
                skeleton: 'taskDetail',
            },
        },
        {
            path: 'create',
            name: 'templateCreate',
            component: () => import('@views/task-manage/template-operation'),
            meta: {
                title: I18n.t('新建作业模板'),
            },
        },
        {
            path: 'import',
            name: 'taskImport',
            component: () => import('@views/task-manage/import'),
            meta: {
                title: I18n.t('导入作业'),
                full: true,
            },
        },
        {
            path: 'export',
            name: 'taskExport',
            component: () => import('@views/task-manage/export'),
            meta: {
                title: I18n.t('导出作业'),
                full: true,
            },
        },
        {
            // stepId 默认展示指定步骤
            path: 'edit/:id/:stepId?',
            name: 'templateEdit',
            component: () => import('@views/task-manage/template-operation'),
            meta: {
                title: I18n.t('编辑作业模板'),
                skeleton: 'taskDetail',
            },
        },
        {
            path: 'clone/:id',
            name: 'templateClone',
            component: () => import('@views/task-manage/template-operation'),
            meta: {
                title: I18n.t('克隆作业模板'),
                skeleton: 'taskDetail',
            },
        },
        {
            path: 'view_plan/:templateId',
            name: 'viewPlan',
            component: () => import('@views/task-manage/template-plan-list'),
            meta: {
                title: I18n.t('查看执行方案'),
                skeleton: 'list',
            },
        },
        {
            path: 'sync_plan/:templateId/:id',
            name: 'syncPlan',
            component: () => import('@views/task-manage/sync-plan'),
            meta: {
                title: I18n.t('同步确认'),
                full: true,
            },
        },
        {
            path: 'debug_plan/:id',
            name: 'debugPlan',
            component: () => import('@views/task-manage/debug-plan/index'),
            meta: {
                title: I18n.t('调试'),
                skeleton: 'setVariable',
            },
        },
        {
            path: 'setting_variable/:templateId/:id/:debug?',
            name: 'settingVariable',
            component: () => import('@views/task-manage/setting-variable'),
            meta: {
                title: I18n.t('设置全局变量'),
                skeleton: 'setVariable',
            },
        },
    ],
};
