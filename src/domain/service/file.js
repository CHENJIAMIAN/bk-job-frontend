

/* eslint-disable no-param-reassign */
import fileSource from '../source/file';
import FileModel from '@model/file/file';

export default {
    fetchgetListFileNode (params) {
        return fileSource.getListFileNode(params)
            .then(({ data }) => {
                const {
                    metaData,
                    pageData,
                    fileSourceInfo,
                } = data;
                return {
                    ...pageData,
                    metaData,
                    fileSourceInfo,
                };
            });
    },
    executeAction (params) {
        return fileSource.updateAction(params)
            .then(({ data }) => data);
    },
    bucketList (params) {
        return fileSource.getList(params)
            .then(({ data }) => {
                data.data = data.data.map(file => Object.freeze(new FileModel(file)));
                return data;
            });
    },

    fileList (params) {
        return fileSource.getFileList(params)
            .then(({ data }) => {
                data.data = data.data.map(file => new FileModel(file));
                return data;
            });
    },
    deleteBucketFile (params) {
        return fileSource.deleteFile(params)
            .then(({ data }) => data);
    },
    deleteBucket (params) {
        return fileSource.deleteBucket(params)
            .then(({ data }) => data);
    },
    uploadFiles (params) {
        return fileSource.uploadFilesToBucket(params)
            .then(({ data }) => data);
    },
};
