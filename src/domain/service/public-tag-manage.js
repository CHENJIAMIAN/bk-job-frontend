

/* eslint-disable no-param-reassign */
import PubliceTagSource from '../source/public-tag-manage';
import TagModel from '@model/tag';

export default {
    fetchTagList (params) {
        return PubliceTagSource.getAll(params)
            .then(({ data }) => data.sort((pre, next) => pre.id - next.id).map(tag => new TagModel(tag)));
    },
    fetchTagOfSearch (tagName) {
        return PubliceTagSource.getAll({
            tagName,
        }).then(({ data }) => data.map(tag => new TagModel(tag)));
    },
};
