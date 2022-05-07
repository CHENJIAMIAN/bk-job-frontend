

export default {
    path: 'public_script',
    name: 'publicScript',
    component: () => import('@views/public-script-manage/index'),
    meta: {
        title: '公共脚本',
        public: true,
        group: 'manage',
    },
    redirect: {
        name: 'publicScriptList',
    },
    children: [
        {
            path: 'list',
            name: 'publicScriptList',
            component: () => import('@views/script-manage/list/'),
            meta: {
                pageTitle: '公共脚本',
                public: true,
                full: true,
                skeleton: 'list',
            },
        },
        {
            path: 'create',
            name: 'createPublicScript',
            component: () => import('@views/script-manage/create/'),
            meta: {
                title: '新建脚本',
                public: true,
            },
        },
        {
            path: 'version/:id',
            name: 'publicScriptVersion',
            component: () => import('@views/script-manage/version'),
            meta: {
                title: '版本管理',
                public: true,
                skeleton: 'list',
            },
        },
        {
            path: 'sync/:scriptId/:scriptVersionId',
            name: 'scriptPublicSync',
            component: () => import('@views/script-manage/sync-confirm'),
            meta: {
                title: '同步确认',
                public: true,
            },
        },
        {
            path: 'sync_task/:scriptId/:scriptVersionId',
            name: 'scriptPublicSyncTask',
            component: () => import('@views/script-manage/sync-task'),
            meta: {
                title: '同步任务',
                public: true,
            },
        },
    ],
};
