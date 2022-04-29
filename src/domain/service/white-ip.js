

/* eslint-disable no-param-reassign */
import WhiteIpSource from '../source/white-ip';
import WhiteIpModel from '@model/white-ip';

export default {
    whiteIpUpdate (params = {}) {
        return WhiteIpSource.update(params);
    },
    getAllCloudArea () {
        return WhiteIpSource.getAllCloudArea()
            .then(({ data }) => data);
    },
    getDetail (params = {}) {
        return WhiteIpSource.getDataById(params);
    },
    whiteDelete (params = {}) {
        return WhiteIpSource.deleteDataById(params);
    },
    whiteIpList (params = {}, payload) {
        return WhiteIpSource.getAll(params, payload)
            .then(({ data }) => {
                data.data = data.data.map(item => new WhiteIpModel({
                    ...item,
                    canManage: item.canManage,
                }));
                return data;
            });
    },
    getScope (params = {}) {
        return WhiteIpSource.getActionScope(params)
            .then(({ data }) => data);
    },
};
