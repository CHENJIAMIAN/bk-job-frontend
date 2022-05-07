

export default {
    path: 'cron',
    name: 'cronJob',
    component: () => import('@views/cron-job'),
    meta: {
        group: 'business',
    },
    redirect: {
        name: 'cronList',
    },
    children: [
        {
            path: 'list',
            name: 'cronList',
            component: () => import('@views/cron-job/list'),
            meta: {
                title: '定时任务',
                full: false,
                skeleton: 'list',
            },
        },
    ],
};
