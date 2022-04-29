

/* eslint-disable no-param-reassign */
import Cookie from 'js-cookie';
import UserModel from '@model/user';
import UserSource from '../source/user';

export default {
    fetchUserInfo () {
        return UserSource.getData()
            .then(({ data }) => {
                Cookie.set('job_user', data.username);
                return Object.freeze(new UserModel(data));
            });
    },
};
