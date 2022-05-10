<template>
    <div class="job-tag-select" v-bkloading="{ isLoading }">
        <bk-select
            ref="select"
            searchable
            multiple
            display-tag
            :clearable="false"
            :value="realValue"
            @change="handleChange">
            <bk-option
                v-for="tagItem in list"
                :key="tagItem.id"
                :id="tagItem.id"
                :name="tagItem.name" />
            <template v-if="!publicScript" slot="extension">
                <auth-component auth="tag/create">
                    <div @click="handleCreate">
                        <i class="bk-icon icon-plus-circle mr10" />{{ '新建标签' }}
                    </div>
                    <div slot="forbid">
                        <i class="bk-icon icon-plus-circle mr10" />{{ '新建标签' }}
                    </div>
                </auth-component>
            </template>
        </bk-select>
        <lower-component level="custom" :custom="isShowCreate">
            <operation-tag
                v-model="isShowCreate"
                @on-change="handleTagNew" />
        </lower-component>
    </div>
</template>
<script>
    import PubliceTagManageService from '@service/public-tag-manage';
    import TagManageService from '@service/tag-manage';
    import { checkPublicScript } from '@utils/assist';
    import OperationTag from '@components/operation-tag';

    export default {
        name: 'JbTagSelect',
        components: {
            OperationTag,
        },
        props: {
            value: {
                type: Array,
                default: () => [],
            },
        },
        data () {
            return {
                // tag 列表loading
                isLoading: true,
                // 新建 tag 弹框
                isShowCreate: false,
                realValue: [],
                publicScript: true,
                list: [{},{},{}],
            };
        },
        watch: {
            value: {
                handler (value) {
                    this.realValue = value.map(_ => _.id);
                },
                immediate: true,
            },
        },
        created () {
            this.publicScript = checkPublicScript(this.$route);
            
            this.fetchData();
        },
        methods: {
            /**
             * @desc 获取 tag 列表
             */
            fetchData () {
                this.isLoading = true;
                const requestHandler = this.publicScript ? PubliceTagManageService.fetchTagList : TagManageService.fetchWholeList;
                return requestHandler()
                    .then((data) => {
                        this.list = Object.freeze(data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 外部调用显示tag选择面板
             */
            show () {
                this.$refs.select.show();
            },
            
            /**
             * @desc 更新选中的tag
             */
            handleChange (value) {
                const valueMap = value.reduce((result, item) => {
                    result[item] = true;
                    return result;
                }, {});
                const result = [];
                this.list.forEach((item) => {
                    if (valueMap[item.id]) {
                        result.push({ ...item });
                    }
                });
                this.$emit('on-change', result);
                this.$emit('change', result);
                this.$emit('input', result);
            },
            /**
             * @desc 显示新建tag弹框
             */
            handleCreate () {
                this.$refs.select.close();
                this.isShowCreate = true;
            },
            /**
             * @desc 新建标签
             * @param { Object } tag
             */
            handleTagNew (tag) {
                this.fetchData()
                    .then(() => {
                        this.realValue.push(tag.id);
                        this.isShowCreate = false;
                        this.$refs.select.show();
                    });
            },
        },
    };
</script>
<style lang='postcss'>
    .job-tag-select {
        .bk-select {
            &.is-focus {
                z-index: 9;
            }
        }

        .bk-select-dropdown {
            background: #fff;
        }
    }
</style>
