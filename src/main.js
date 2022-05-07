
import Vue from 'vue';
import '@icon-cool/bk-icon-job';
import '@icon-cool/bk-icon-job/src/index.js';
import createRouter from '@/router';
import store from '@/store';
import AppService from '@service/app-manage';
import QueryGlobalSettingService from '@service/query-global-setting';
import TaskExecuteService from '@service/task-execute';
import TaskPlanService from '@service/task-plan';
import EntryTask from '@/utils/entry-task';
import { scopeCache } from '@/utils/cache-helper';
import '@/common/bkmagic';
import '@/css/reset.css';
import '@/css/app.css';
import App from '@/App';
import IframeApp from '@/iframe-app';

/**
 * @desc 启动打印当前系统信息
 */
console.log(process.env.JOB_WELCOME);

/**
 * @desc 页面数据的编辑状态
 */
window.changeAlert = false;

/**
 * @desc 因为 IP 有白名单功能，生效范围需要更新场景区分
 * - '' 所有
 * - SCRIPT_EXECUTE 生效范围脚本执行
 * - FILE_DISTRIBUTION 生效范围文件分发
 */
window.IPInputScope = '';
/**
 * @desc 开启路由回溯
 */
window.routerFlashBack = false;

/**
 * @desc 浏览器框口关闭提醒
 */
window.addEventListener('beforeunload', (event) => {
    // 需要做 Boolean 类型的值判断
    if (window.changeAlert !== true) {
        return null;
    }
    const e = event || window.event;
    if (e) {
        e.returnValue = '离开将会导致未保存信息丢失';
    }
    return '离开将会导致未保存信息丢失';
});

const EntryApp = App;

window.BKApp = new Vue({
    el: '#app',
    router: createRouter({
    }),
    store,
    render: h => h(EntryApp),
});
