

import {
    makeMap,
} from './make-map';

// 业务访问权限
const busnissPermissionList = [
    'biz/access_business',
];

// 作业模板权限
const templatePermissionList = [
    'job_template/create',
    'job_template/view',
    'job_template/edit',
    'job_template/delete',
    'job_template/clone',
    'job_template/debug',
];

// 执行方案权限
const planPermissionList = [
    'job_plan/create',
    'job_plan/view',
    'job_plan/edit',
    'job_plan/delete',
    'job_plan/execute',
    'job_plan/sync',
];

// 业务脚本权限
const scriptPermissionList = [
    'script/create',
    'script/view',
    'script/edit',
    'script/delete',
    'script/execute',
    'script/clone',
];

// 公共脚本权限
const publicScriptPermissionList = [
    'public_script/create',
    'public_script/view',
    'public_script/edit',
    'public_script/delete',
    'public_script/execute',
    'public_script/clone',
];

// 标签权限
const tagPermissionList = [
    'tag/create',
    'tag/edit',
    'tag/delete',
];

// 账号权限
const accountPermissionList = [
    'account/create',
    'account/view',
    'account/edit',
    'account/delete',
    'account/use',
];

// IP 白名单权限
const whiteListPermissionList = [
    'whitelist/create',
    'whitelist/view',
    'whitelist/edit',
    'whitelist/delete',
];

// 定时任务权限
const cronPermissionList = [
    'cron/create',
    'cron/view',
    'cron/edit',
    'cron/delete',
    'cron/execute',
];

// 作业执行可操作权限
const executePermissionList = [
    'task_instance/view',
    'task_instance/redo',
];

// 文件源权限
const fileSourcePermissionList = [
    'file_source/view',
    'file_source/create',
    'file_source/edit',
    'file_source/delete',
];

// 凭证权限
const ticketPermissionList = [
    'ticket/create',
    'ticket/edit',
    'ticket/delete',
    'ticket/use',
];

// 权限对应的后端微服务模块
// job-manage 微服务控制权限
const jobManagePermissionMap = makeMap([
    ...busnissPermissionList,
    ...scriptPermissionList,
    ...publicScriptPermissionList,
    ...templatePermissionList,
    ...planPermissionList,
    ...tagPermissionList,
    ...accountPermissionList,
    ...whiteListPermissionList,
]);

// crontab 微服务控制权限
const jobCrontabPermissionMap = makeMap(cronPermissionList);

// execute 微服务控制权限
const jobExecutePermissionMap = makeMap(executePermissionList);

// 文件分发微服务控制
const jobFileSourcePermissionMap = makeMap(fileSourcePermissionList);

const jobTickerPermissionMap = makeMap(ticketPermissionList);

export const isScriptPermission = permission => /^script\//.test(permission);

export const isJobManagePermission = permission => !!jobManagePermissionMap[permission];

export const isJobCrontabPermission = permission => !!jobCrontabPermissionMap[permission];

export const isJobExecutePermission = permission => !!jobExecutePermissionMap[permission];

export const isJobFileSourcePermission = permission => !!jobFileSourcePermissionMap[permission];

export const isJobTicketPermission = permission => !!jobTickerPermissionMap[permission];
