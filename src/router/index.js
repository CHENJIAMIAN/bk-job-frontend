

import Vue from 'vue';
import VueRouter from 'vue-router';
import _ from 'lodash';
import {
    leaveConfirm,
} from '@utils/assist';
import {
    routerCache,
} from '@utils/cache-helper';

import Entry from '@views/index';
// import BusinessPermission from '@views/business-permission';
import NotFound from '@views/404';

import Home from '@views/home/routes';
import AccountManage from '@views/account-manage/routes';
import NotifyManage from '@views/notify-manage/routes';
import PublicScriptManage from '@views/public-script-manage/routes';
import GlobalSetting from '@views/global-setting/routes';
import WhiteIP from '@views/white-ip/routes';
import TaskManage from '@views/task-manage/routes';
import PlanManage from '@views/plan-manage/routes';
import FastExecution from '@views/fast-execution/routes';
import ScriptManage from '@views/script-manage/routes';
import ScriptTemplate from '@views/script-template/routes';
import CronJob from '@views/cron-job/routes';
import ExecutiveHistory from '@views/executive-history/routes';
import Dashboard from '@views/dashboard/routes';
import FileManage from '@views/file-manage/routes';
import TicketManage from '@views/ticket-manage/routes';
import ServiceState from '@views/service-state/routes';
import DetectRecords from '@views/detect-records/routes';
import DangerousRuleManage from '@views/dangerous-rule-manage/routes';
import TagManage from '@views/tag-manage/routes';

Vue.use(VueRouter);

let lastRouterHrefCache = '/';

// const renderPageWithComponent = (route, component) => {
//     if (route.component) {
//     // eslint-disable-next-line no-param-reassign
//         route.component = component;
//     }
//     if (route.children) {
//         route.children.forEach((item) => {
//             renderPageWithComponent(item);
//         });
//     }
// };

export default ({ appList, isAdmin, scopeType, scopeId }) => {
    // scope 是否有效
    // const isValidScope = false;
    // scope 是有有权限查看
    // const hasScopePermission = false;
    
    // const appInfo = appList.find(_ => _.scopeType === scopeType && _.scopeId === scopeId);
    // // scope 存在于业务列表中——有效的 scope
    // if (appInfo) {
    //     isValidScope = true;
    //     // scope 存在于业务列表中——有权限访问
    //     if (appInfo.hasPermission) {
    //         hasScopePermission = true;
    //     }
    // }

    const systemManageRoute = [
        Dashboard,
        ScriptTemplate,
    ];
        // admin用户拥有系统设置功能
    systemManageRoute.push(PublicScriptManage);
    systemManageRoute.push(WhiteIP);
    systemManageRoute.push(GlobalSetting);
    systemManageRoute.push(ServiceState);
    systemManageRoute.push(DangerousRuleManage);
    systemManageRoute.push(DetectRecords);

    // 生成路由配置
    const routes = [
        {
            path: window.PROJECT_CONFIG.ROUTE_PUBLIC_PATH,
            component: Entry,
            redirect: {
                name: 'home',
            },
            children: [
                ...systemManageRoute,
                AccountManage,
                NotifyManage,
                Home,
                TaskManage,
                PlanManage,
                FastExecution,
                ScriptManage,
                CronJob,
                ExecutiveHistory,
                FileManage,
                TicketManage,
                TagManage,
            ],
        },
        {
            path: '/api_(execute|plan)/:id+',
            component: {
                render () {
                    return this._e(); // eslint-disable-line no-underscore-dangle
                },
            },
        },
        {
            path: '*',
            name: '404',
            component: NotFound,
        },
    ];

    // if (!isValidScope) {
    //     renderPageWithComponent(routes[1], NotFound);
    // } else if (!hasScopePermission) {
    //     renderPageWithComponent(routes[1], BusinessPermission);
    // }

    const router = new VueRouter({
        mode: 'history',
        routes,
        scrollBehavior () {
            return {
                x: 0, y: 0,
            };
        },
    });

    const routerPush = router.push;
    const routerReplace = router.replace;

    // window.routerFlashBack === true 时查找路由缓存参数
    const routerFlaskBack = (params, currentRoute) => {
        /* eslint-disable no-param-reassign */
        params = _.cloneDeep(params);
        if (window.routerFlashBack) {
            // 路由回退
            const query = routerCache.getItem(params.name);
            if (query) {
                params.query = {
                    ...query,
                    ...params.query || {},
                };
            }
        } else {
            routerCache.clearItem(params.name);
        }
        lastRouterHrefCache = router.resolve(params).href;
        return params;
    };
    const leaveConfirmHandler = (currentRoute) => {
        if (Object.prototype.hasOwnProperty.call(currentRoute, 'meta')
            && Object.prototype.hasOwnProperty.call(currentRoute.meta, 'leavaConfirm')
            && typeof currentRoute.meta.leavaConfirm === 'function') {
            return currentRoute.meta.leavaConfirm();
        }
        return leaveConfirm();
    };
    // 路由切换时
    // 检测页面数据的编辑状态——弹出确认框提示用户确认
    // 如果需要路由回溯（window.routerFlashBack === true）查找缓存是否有跳转目标的路由缓存数据
    router.push = (params, callback = () => {}) => {
        const { currentRoute } = router;
        // 检测当前路由自定义离开确认交互
        leaveConfirmHandler(currentRoute).then(() => {
            routerPush.call(router, routerFlaskBack(params, currentRoute));
            window.routerFlashBack = false;
        }, () => {
            callback();
        });
    };
    // 路由切换时
    // 检测页面数据的编辑状态——弹出确认框提示用户确认
    // 如果需要路由回溯（window.routerFlashBack === true）查找缓存是否有跳转目标的路由缓存数据
    router.replace = (params, callback = () => {}) => {
    // 检测当前路由自定义离开确认交互
        const { currentRoute } = router;
        leaveConfirmHandler(currentRoute).then(() => {
            routerReplace.call(router, routerFlaskBack(params, currentRoute));
            window.routerFlashBack = false;
        }, () => {
            callback();
        });
    };
    // 异步路由加载失败刷新页面
    router.onError((error) => {
        if (/Loading chunk (\d*) failed/.test(error.message)) {
            window.location.href = lastRouterHrefCache;
        }
    });
    return router;
};
