

import fileSourceType from '../source/file-source-type';

export default {
    sourceTypeList (params) {
        return fileSourceType.getList(params)
            .then(({ data }) => data);
    },
};
