

export default {
    path: 'detect_records',
    name: 'detectRecords',
    component: () => import('@views/detect-records'),
    redirect: {
        name: 'detectRecordsList',
    },
    meta: {
        title: '检测记录',
        group: 'manage',
    },
    children: [
        {
            path: 'list',
            name: 'detectRecordsList',
            component: () => import('@views/detect-records/list'),
            meta: {
                pageTitle: '检测记录',
                skeleton: 'list',
            },
        },
    ],
};
