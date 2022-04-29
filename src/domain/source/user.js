

import Request from '@utils/request';

class User {
    getData () {
        return Request.get('user/current', {
            cache: true,
        });
    }
}

export default new User();
