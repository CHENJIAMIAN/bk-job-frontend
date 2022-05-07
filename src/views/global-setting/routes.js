

export default {
    path: 'setting',
    name: 'globalSetting',
    component: () => import('@views/global-setting/'),
    meta: {
        title: '全局设置',
        group: 'manage',
    },
    redirect: {
        name: 'globalSettingIndex',
    },
    children: [
        {
            path: 'index',
            name: 'globalSettingIndex',
            component: () => import('@views/global-setting/index/index'),
            meta: {
                title: '全局设置',
                skeleton: 'globalSetUp',
            },
        },
    ],
};
