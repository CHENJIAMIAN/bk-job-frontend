

import I18n from '@/i18n';

export default {
    path: 'ticket_manage',
    name: 'ticketManage',
    component: () => import('@views/ticket-manage/index'),
    redirect: {
        name: 'ticketList',
    },
    meta: {
        title: I18n.t('凭证管理'),
        group: 'business',
    },
    children: [
        {
            path: 'ticket_list',
            name: 'ticketList',
            component: () => import('@views/ticket-manage/list/'),
            meta: {
                pageTitle: I18n.t('凭证管理'),
                skeleton: 'list',
            },
        },
    ],
};
