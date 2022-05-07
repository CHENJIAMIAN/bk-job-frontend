

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
                title: '首页',
            },
        },
    ],
};
