

/* eslint-disable no-param-reassign */
import fileWorker from '../source/file-worker';
import FileWorkerModel from '@model/file/file-worker';

export default {
    workersList (params) {
        return fileWorker.getList(params)
            .then((data) => {
                data.data = data.data.map(work => Object.freeze(new FileWorkerModel(work)));
                return data.data;
            });
    },
};
