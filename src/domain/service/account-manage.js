

/* eslint-disable no-param-reassign */
import AccountSource from '../source/account-manage';
import AccountModel from '@model/account';

export default {
    fetchAccountWhole (params) {
        return AccountSource.getWhole(params)
            .then(({ data }) => Object.freeze(data.map(item => new AccountModel(item))));
    },
    fetchAccountList (params) {
        return AccountSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(item => Object.freeze(new AccountModel(item)));
                return data;
            });
    },
    createAccount (params) {
        return AccountSource.create(params);
    },
    updateAccount (params) {
        return AccountSource.update(params);
    },
    deleteAccount (params) {
        return AccountSource.deleteById(params);
    },
};
