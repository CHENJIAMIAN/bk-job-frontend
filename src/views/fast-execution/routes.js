

import I18n from '@/i18n';

export default {
    path: 'execute',
    name: 'execute',
    component: () => import('@views/fast-execution'),
    redirect: {
        name: 'fastExecuteScript',
    },
    meta: {
        title: I18n.t('快速执行'),
        group: 'business',
    },
    children: [
        {
            path: 'script/:taskInstanceId?/:scriptVersionId?',
            name: 'fastExecuteScript',
            component: () => import('@views/fast-execution/exec-script'),
            meta: {
                title: I18n.t('执行脚本'),
            },
        },
        {
            path: 'file/:taskInstanceId?',
            name: 'fastPushFile',
            component: () => import('@views/fast-execution/distro-file'),
            meta: {
                title: I18n.t('分发文件'),
            },
        },
    ],
};
