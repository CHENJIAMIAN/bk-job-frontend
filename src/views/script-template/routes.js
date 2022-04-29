

import I18n from '@/i18n';

export default {
    path: 'script_template',
    name: 'scriptTemplate',
    component: () => import('@views/script-template/'),
    meta: {
        title: I18n.t('脚本模板'),
        group: 'personal',
    },
    redirect: {
        name: 'scriptTemplateIndex',
    },
    children: [
        {
            path: 'index',
            name: 'scriptTemplateIndex',
            component: () => import('@views/script-template/index/index'),
            meta: {
                title: I18n.t('脚本模板'),
            },
        },
    ],
};
