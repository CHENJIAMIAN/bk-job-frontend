

export default {
    path: 'tag_manage',
    name: 'tagManage',
    component: () => import('@views/tag-manage/'),
    meta: {
        title: '标签',
        group: 'business',
    },
    redirect: {
        name: 'tagList',
    },
    children: [
        {
            path: 'index',
            name: 'tagList',
            component: () => import('@views/tag-manage/index/index'),
            meta: {
                title: '标签',
                skeleton: 'list',
            },
        },
    ],
};
