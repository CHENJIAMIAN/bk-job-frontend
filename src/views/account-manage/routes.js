

export default {
    path: 'account',
    name: 'accountManage',
    component: () => import('@views/account-manage/index'),
    meta: {
        title: '账号管理',
        group: 'business',
    },
    redirect: {
        name: 'accountList',
    },
    children: [
        {
            path: 'list',
            name: 'accountList',
            component: () => import('@views/account-manage/index/index'),
            meta: {
                title: '账号管理',
                skeleton: 'list',
            },
        },
    ],
};
