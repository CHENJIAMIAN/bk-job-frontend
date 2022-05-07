

export default {
    path: 'service',
    name: 'service',
    component: () => import('@views/service-state/index'),
    redirect: {
        name: 'serviceStateList',
    },
    meta: {
        title: '服务状态',
        group: 'manage',
    },
    children: [
        {
            path: 'list',
            name: 'serviceStateList',
            component: () => import('@views/service-state/list'),
            meta: {
                pageTitle: '服务状态',
                skeleton: 'list',
            },
        },
    ],
};
