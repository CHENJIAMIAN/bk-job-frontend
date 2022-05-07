

export default {
    path: 'file_manage',
    name: 'fileManage',
    component: () => import('@views/file-manage/index'),
    redirect: {
        name: 'sourceFileList',
    },
    meta: {
        title: '文件源管理',
        group: 'business',
    },
    children: [
        {
            path: 'source_list',
            name: 'sourceFileList',
            component: () => import('@views/file-manage/file-source-list'),
            meta: {
                pageTitle: '文件源管理',
                skeleton: 'list',
            },
        },
        {
            path: 'file_list',
            name: 'fileList',
            component: () => import('@views/file-manage/file-list'),
            meta: {
                pageTitle: '文件源管理',
                skeleton: 'list',
            },
        },
    ],
};
