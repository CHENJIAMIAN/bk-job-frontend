

/* eslint-disable no-param-reassign */
import LogoutSource from '../source/logout';

export default {
    logout () {
        return LogoutSource.logout()
            .then(({ data }) => data);
    },
};
