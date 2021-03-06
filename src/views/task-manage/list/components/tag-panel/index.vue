<template>
    <div class="template-list-tag-panel" v-bkloading="{ isLoading }">
        <tab-item
            :name="'全部作业'"
            :id="1"
            :value="classesId"
            icon="business-manage"
            :count="totalCount"
            :tooltips-disabled="true"
            @on-select="handleClassesSelect" />
        <tab-item
            :name="'未分类'"
            :id="2"
            :value="classesId"
            icon="unclassified"
            :count="unclassifiedCount"
            :tooltips-disabled="true"
            @on-select="handleClassesSelect" />
        <tab-item
            :name="'待更新'"
            :id="3"
            :value="classesId"
            icon="update"
            :count="needUpdateCount"
            :tooltips-disabled="true"
            @on-select="handleClassesSelect" />
        <div class="line" />
        <template v-for="item in list">
            <tab-item
                v-if="item.relatedTaskTemplateNum > 0"
                :key="item.id"
                :id="item.id"
                :count="item.relatedTaskTemplateNum"
                :name="item.name"
                :description="item.description"
                :value="tagId"
                :can-edit="true"
                :tag-list="list"
                @on-select="handleSelect"
                @on-edit="handleEdit" />
        </template>
    </div>
</template>
<script>
       import TaskManageService from '@service/task-manage';
    import TagManageService from '@service/tag-manage';
    import TabItem from './tab-item';

    export default {
        name: 'RenderTagTabItem',
        components: {
            TabItem,
        },
        props: {
            active: {
                type: [
                    String,
                    Number,
                ],
                default: '',
            },
        },
        data () {
            return {
                isLoading: false,
                classesId: 1,
                tagId: 0,
                list: [{},{},{}],
                countMap: {},
                isNumberLoading: false,
            };
        },
        computed: {
            totalCount () {
                return this.countMap.total || 0;
            },
            unclassifiedCount () {
                return this.countMap.unclassified || 0;
            },
            needUpdateCount () {
                return this.countMap.needUpdate || 0;
            },
        },
        created () {
            this.init();
        },
        mounted () {
            this.parseDefaultValueFromURL();
        },
        methods: {
            /**
             * @desc 获取tag列表
             */
            fetchTagList () {
                return TagManageService.fetchWholeList();
            },
            /**
             * @desc 获取tag的使用数量
             */
            fetchTagTemplateNum () {
                return TaskManageService.fetchTagCount();
            },
            init () {
                this.isLoading = true;
                Promise.all([
                    this.fetchTagList(),
                    this.fetchTagTemplateNum(),
                ]).then(([tagList, countMap]) => {
                    this.countMap = Object.freeze(countMap);
                    const list = [];
                    tagList.forEach((tag) => {
                        tag.relatedTaskTemplateNum = countMap.tagCount[tag.id] || 0;
                        list.push(tag);
                    });
                    this.list = Object.freeze(list);
                    this.$emit('on-init', list);
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 解析url中的默认tag
             */
            parseDefaultValueFromURL () {
                let classesId = 1;
                if (this.$route.query.type) {
                    classesId = ~~this.$route.query.type || 1;
                    this.handleClassesSelect(classesId);
                    return;
                }
                
                if (this.$route.query.panelTag) {
                    const currentTagId = parseInt(this.$route.query.panelTag, 10);
                    if (currentTagId > 0) {
                        this.classesId = 0;
                        this.handleSelect(currentTagId);
                    }
                }
            },
            /**
             * @desc 分类切换
             * @param {Number} id 分类id
             */
            handleClassesSelect (id) {
                if (this.classesId === id) {
                    return;
                }
                
                this.classesId = id;
                this.tagId = 0;
                this.$emit('on-change', {
                    type: this.classesId,
                    panelTag: '',
                });
            },
            /**
             * @desc tag切换
             * @param {Number} id 分类id
             */
            handleSelect (id) {
                if (id === this.tagId) return;
                this.tagId = id;
                this.classesId = 0;
                this.$emit('on-change', {
                    type: '',
                    panelTag: this.tagId,
                });
            },
            /**
             * @desc 编辑tag
             * @param {Object} payload 标签数据
             *
             * 编辑成功需要刷新标签数据
             */
            handleEdit (payload) {
                TagManageService.updateTag(payload)
                    .then(() => {
                        this.messageSuccess('标签名更新成功');
                        this.fetchTagList();
                    });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .template-list-tag-panel {
        display: flex;
        flex-direction: column;
        min-height: 50%;
        padding: 24px 0;

        .line {
            height: 1px;
            margin: 10px 0;
            background: #f0f1f5;
        }
    }
</style>
