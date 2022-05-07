

export default {
    path: 'execute',
    name: 'executiveHistory',
    component: () => import('@views/executive-history'),
    redirect: {
        name: 'historyList',
    },
    meta: {
        title: '执行历史',
        group: 'business',
    },
    children: [
        {
            path: 'list',
            name: 'historyList',
            component: () => import('@views/executive-history/list'),
            meta: {
                pageTitle: '执行历史',
                skeleton: 'list',
            },
        },
        {
            path: 'task/:id',
            name: 'historyTask',
            component: () => import('@views/executive-history/task-detail'),
            meta: {
                title: '作业执行详情',
                skeleton: 'taskExecutiveDetail',
            },
        },
        {
            path: 'step/:taskInstanceId',
            name: 'historyStep',
            component: () => import('@views/executive-history/step-detail'),
            meta: {
                title: '步骤执行详情',
                full: true,
                skeleton: 'taskStepExecutiveDetail',
            },
        },
        {
            path: 'redo_task/:taskInstanceId',
            name: 'redoTask',
            component: () => import('@views/executive-history/redo-task'),
            meta: {
                title: '重做执行方案',
                skeleton: 'setVariable',
            },
        },
    ],
};
