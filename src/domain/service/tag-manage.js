

/* eslint-disable no-param-reassign */
import TagManageSource from '../source/tag-manage';
import TagNumSource from '../source/tag-num';
import TagModel from '@model/tag';

export default {
    /**
     * @desc 列表接口，支持分页
     * @param { Object } params 筛选参数
     * @returns { Promise }
     */
    fetchTagList (params = {}) {
        return TagManageSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(tag => new TagModel(tag));
                return data;
            });
    },
    /**
     * @desc tag 基础信息列表（全量，不支持分页）
     * @param { Object } params 筛选参数
     * @returns { Promise }
     */
    fetchWholeList (params = {}) {
        return TagManageSource.getAllWithBasic(params)
            .then(({ data }) => data.map(item => new TagModel(item)));
    },
    /**
     * @desc 批量流转 tag
     * @param { Object } params 筛选参数
     * @returns { Promise }
     */
    batchUpdate (params = {}) {
        return TagManageSource.batchUpdate(params)
            .then(({ data }) => data);
    },
    fetchTagOfSearch (name) {
        return TagManageSource.getAllWithBasic({
            name,
        }).then(({ data }) => data.map(tag => new TagModel(tag)));
    },
    fetchTagTemplateNum (params = {}) {
        return TagNumSource.getNum(params)
            .then(({ data }) => data);
    },
    remove (params = {}) {
        return TagManageSource.remove(params)
            .then(({ data }) => data);
    },
    updateTag (params = {}) {
        return TagManageSource.update(params)
            .then(({ data }) => data);
    },
    createTag (params) {
        return TagManageSource.create(params)
            .then(({ data }) => data);
    },
    checkName (params = {}) {
        return TagManageSource.checkName(params)
            .then(({ data }) => data);
    },
};
