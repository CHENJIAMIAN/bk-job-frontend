

/* eslint-disable no-param-reassign */
import dangerousRecord from '../source/dangerous-record';
import DangerousRecordModel from '@model/dangerous-record';

export default {
    recordList (params, payload) {
        return dangerousRecord.getDangerousRecordList(params, payload)
            .then(({ data }) => {
                if (data.data) {
                    data.data = data.data.map(item => Object.freeze(new DangerousRecordModel(item)));
                    return data;
                }
                return [];
            });
    },
};
