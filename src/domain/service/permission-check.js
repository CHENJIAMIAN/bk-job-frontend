

/* eslint-disable no-param-reassign */
import PermissionCheckSource from '../source/permission-check';
import AuthResultModel from '@model/auth-result';
import {
    checkPublicScript,
    isScriptPermission,
    isJobManagePermission,
    isJobCrontabPermission,
    isJobExecutePermission,
    isJobFileSourcePermission,
    isJobTicketPermission,
} from '@utils/assist';

const permissionCheckService = {
    fetchJobManagePermission (params = {}) {
        return PermissionCheckSource.jobManage(params)
            .then(({ data }) => new AuthResultModel(data));
    },
    fetchJobCrontabPermission (params = {}) {
        return PermissionCheckSource.jobCrontab(params)
            .then(({ data }) => new AuthResultModel(data));
    },
    fetchJobExecutePermission (params) {
        return PermissionCheckSource.jobExecute(params)
            .then(({ data }) => new AuthResultModel(data));
    },
    fetchJobFileSourcePermission (params) {
        return PermissionCheckSource.jobFileSource(params)
            .then(({ data }) => new AuthResultModel(data));
    },
    fetchJobTickerPermissionn (params) {
        return PermissionCheckSource.jobTicket(params)
            .then(({ data }) => new AuthResultModel(data));
    },
    fetchPermission (params) {
        let requestService = () => Promise.resolve(new AuthResultModel({}));
        if (isJobManagePermission(params.operation)) {
            requestService = permissionCheckService.fetchJobManagePermission;
        } else if (isJobCrontabPermission(params.operation)) {
            requestService = permissionCheckService.fetchJobCrontabPermission;
        } else if (isJobExecutePermission(params.operation)) {
            requestService = permissionCheckService.fetchJobExecutePermission;
        } else if (isJobFileSourcePermission(params.operation)) {
            requestService = permissionCheckService.fetchJobFileSourcePermission;
        } else if (isJobTicketPermission(params.operation)) {
            requestService = permissionCheckService.fetchJobTickerPermissionn;
        }
        params = { ...params };
        // 公共脚本权限需要拼接一个public_
        if (isScriptPermission(params.operation) && checkPublicScript(window.BKApp.$route)) {
            params.operation = `public_${params.operation}`;
        }

        return requestService(params);
    },
};

export default permissionCheckService;
