

export default {
    path: 'execute',
    name: 'execute',
    component: () => import('@views/fast-execution'),
    redirect: {
        name: 'fastExecuteScript',
    },
    meta: {
        title: '快速执行',
        group: 'business',
    },
    children: [
        {
            path: 'script/:taskInstanceId?/:scriptVersionId?',
            name: 'fastExecuteScript',
            component: () => import('@views/fast-execution/exec-script'),
            meta: {
                title: '执行脚本',
            },
        },
        {
            path: 'file/:taskInstanceId?',
            name: 'fastPushFile',
            component: () => import('@views/fast-execution/distro-file'),
            meta: {
                title: '分发文件',
            },
        },
    ],
};
