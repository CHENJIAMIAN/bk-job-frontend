

export default {
    path: 'notify',
    name: 'notifyManage',
    component: () => import('@views/notify-manage/index'),
    meta: {
        group: 'business',
    },
    redirect: {
        name: 'notifyManageIndex',
    },
    children: [
        {
            path: 'index',
            name: 'notifyManageIndex',
            component: () => import('@views/notify-manage/index/index'),
            meta: {
                title: '消息通知',
                skeleton: 'notify',
            },
        },
    ],
};
