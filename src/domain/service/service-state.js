

/* eslint-disable no-param-reassign */
import serviceState from '../source/service-state';
import ServiceStateModel from '@model/service-state';

export default {
    serviceList (params = {}, paylaod = {}) {
        return serviceState.getList(params, paylaod)
            .then(({ data }) => data.map(service => new ServiceStateModel(service)));
    },
};
