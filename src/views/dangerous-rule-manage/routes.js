

import I18n from '@/i18n';

export default {
    path: 'dangerous_rule_manage',
    component: () => import('@views/dangerous-rule-manage/index.vue'),
    name: 'dangerousRuleManage',
    redirect: {
        name: 'dangerousRuleList',
    },
    meta: {
        group: 'manage',
    },
    children: [
        {
            path: 'index',
            name: 'dangerousRuleList',
            component: () => import('@views/dangerous-rule-manage/index/index.vue'),
            meta: {
                title: I18n.t('高危语句规则'),
                skeleton: 'list',
            },
        },
    ],
};
