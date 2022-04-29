

import Request from '@utils/request';
class Logout {
    logout () {
        return Request.get('/logout');
    }
}

export default new Logout();
