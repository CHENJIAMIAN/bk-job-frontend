

import Request from '@utils/request';

class Permission {
    jobManage (params = {}) {
        return Request.get('/job-manage/web/permission/check', {
            params,
            cache: 2000,
        });
    }

    jobCrontab (params = {}) {
        return Request.get('/job-crontab/web/permission/check', {
            params,
            cache: 2000,
        });
    }

    jobExecute (params = {}) {
        return Request.get('/job-execute/web/permission/check', {
            params,
            cache: 2000,
        });
    }

    jobFileSource (params = {}) {
        return Request.get('/job-file-gateway/web/permission/check', {
            params,
            cache: 2000,
        });
    }

    jobTicket (params = {}) {
        return Request.get('/job-ticket/web/permission/check', {
            params,
            cache: 2000,
        });
    }
}

export default new Permission();
