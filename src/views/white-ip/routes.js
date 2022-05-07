

export default {
    path: 'white_ip',
    name: 'whiteIp',
    component: () => import('@views/white-ip/'),
    meta: {
        title: 'IP 白名单',
        skeleton: 'list',
        group: 'manage',
    },
    redirect: {
        name: 'whiteIpIndex',
    },
    children: [
        {
            path: 'index',
            name: 'whiteIpIndex',
            component: () => import('@views/white-ip/index/index'),
            meta: {
                title: 'IP 白名单',
                skeleton: 'list',
            },
        },
    ],
};
