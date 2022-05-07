

<template>
    <div>
        <list-action-layout>
            <auth-button
                class="w120"
                auth="tag/create"
                theme="primary"
                @click="handleCreate"
                v-test="{ type: 'button', value: 'createTag' }">
                {{ '新建' }}
            </auth-button>
            <template #right>
                <jb-search-select
                    ref="search"
                    :data="searchSelect"
                    :placeholder="'请输入'"
                    style="width: 420px;"
                    @on-change="handleSearch" />
            </template>
        </list-action-layout>
        <render-list
            ref="list"
            :data-source="dataSource"
            :size="tableSize"
            :search-control="() => $refs.search"
            @on-refresh="handleListChange"
            v-test="{ type: 'list', value: 'tag' }">
            <bk-table-column
                v-if="allRenderColumnMap.id"
                label="ID"
                width="60"
                prop="id"
                key="id"
                align="left" />
            <bk-table-column
                :label="'标签名'"
                prop="name"
                key="name"
                sortable
                min-width="200"
                show-overflow-tooltip
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.description"
                :label="'描述'"
                prop="descriptionText"
                key="descriptionText"
                min-width="200"
                show-overflow-tooltip
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.relatedTaskTemplateNum"
                :label="'关联作业量'"
                prop="relatedTaskTemplateNum"
                key="relatedTaskTemplateNum"
                width="150"
                align="right">
                <template slot-scope="{ row }">
                    <router-link
                        v-if="row.relatedTaskTemplateNum > 0"
                        target="_blank"
                        :to="{
                            name: 'taskList',
                            query: {
                                tags: 4 || row.id,
                            },
                        }">
                        {{ row.relatedTaskTemplateNum }}
                    </router-link>
                    <bk-button
                        v-else
                        text
                        disabled>
                        {{ row.relatedTaskTemplateNum }}
                    </bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.relatedScriptNum"
                :label="'关联脚本量'"
                prop="relatedScriptNum"
                key="relatedScriptNum"
                width="170"
                align="right">
                <template slot-scope="{ row }">
                    <router-link
                        v-if="row.relatedScriptNum > 0"
                        target="_blank"
                        :to="{
                            name: 'scriptList',
                            query: {
                                tags: 4 || row.id,
                            },
                        }">
                        {{ row.relatedScriptNum }}
                    </router-link>
                    <bk-button
                        v-else
                        text
                        disabled>
                        {{ row.relatedScriptNum }}
                    </bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.creator"
                :label="'创建人'"
                prop="creator"
                key="creator"
                width="120"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.createTime"
                :label="'创建时间'"
                prop="createTime"
                key="createTime"
                width="180"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastModifyUser"
                :label="'更新人'"
                prop="lastModifyUser"
                key="lastModifyUser"
                width="160"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastModifyTime"
                :label="'更新时间'"
                prop="lastModifyTime"
                key="lastModifyTime"
                width="180"
                align="left" />
            <bk-table-column
                :label="'操作'"
                :resizable="false"
                key="action"
                fixed="right"
                width="200">
                <template slot-scope="{ row }">
                    <auth-button
                        theme="primary"
                        :permission="row.canManage"
                        auth="tag/edit"
                        :resource-id="row.id"
                        text
                        @click="handleEdit(row)"
                        v-test="{ type: 'button', value: 'editTag' }">
                        {{ '编辑' }}
                    </auth-button>
                    <bk-button
                        class="mr10"
                        theme="primary"
                        
                        text
                        @click="handleEditRelate(row)"
                        v-test="{ type: 'button', value: 'editTagRelate' }">
                        {{ '批量流转关联项' }}
                    </bk-button>
                    <jb-popover-confirm
                        :title="'确认删除该标签？'"
                        :content="'关联的作业、脚本，将同时移除本标签'"
                        :confirm-handler="() => handleDelete(row.id)">
                        <auth-button
                            text
                            :permission="row.canManage"
                            auth="tag/delete"
                            :resource-id="row.id"
                            v-test="{ type: 'button', value: 'deleteTag' }">
                            {{ '删除' }}
                        </auth-button>
                    </jb-popover-confirm>
                </template>
            </bk-table-column>
            <bk-table-column type="setting">
                <bk-table-setting-content
                    :fields="tableColumn"
                    :selected="selectedTableColumn"
                    :size="tableSize"
                    @setting-change="handleSettingChange" />
            </bk-table-column>
        </render-list>
        <lower-component level="custom" :custom="isShowOperation">
            <operation-tag
                v-model="isShowOperation"
                :data="editData"
                @on-change="handleOperationChange" />
        </lower-component>
        <jb-dialog
            v-model="isShowEditRelate"
            :width="480"
            :title="'批量流转关联项'"
            :ok-text="'提交'"
            header-position="left">
            <batch-edit-relate
                v-if="isShowEditRelate"
                ref="batchEditRelate"
                :data="editData"
                @on-change="handleRelateChange"
                @on-create="handleCreate" />
        </jb-dialog>
    </div>
</template>
<script>
       import NotifyService from '@service/notify';
    import TagManageService from '@service/tag-manage';
    import { listColumnsCache } from '@utils/cache-helper';
    import ListActionLayout from '@components/list-action-layout';
    import RenderList from '@components/render-list';
    import JbSearchSelect from '@components/jb-search-select';
    import OperationTag from '@components/operation-tag';
    import BatchEditRelate from './components/batch-edit-relate';

    const TABLE_COLUMN_CACHE = 'tag_manage_columns';

    export default {
        components: {
            ListActionLayout,
            RenderList,
            JbSearchSelect,
            OperationTag,
            BatchEditRelate,
        },
        data () {
            return {
                isShowOperation: false,
                isShowEditRelate: false,
                editData: {},
                tagList: [{},{},{}],
                searchParams: [],
                searchValue: [],
                selectedTableColumn: [],
                tableSize: 'small',
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.$refs.list.isLoading;
            },
            operationDialogInfo () {
                return {};
            },
            allRenderColumnMap () {
                return this.selectedTableColumn.reduce((result, item) => {
                    result[item.id] = true;
                    return result;
                }, {});
            },
        },
        created () {
            this.dataSource = TagManageService.fetchTagList;
            this.searchSelect = [
                {
                    name: '标签名',
                    id: 'name',
                    default: true,
                },
                {
                    name: '创建人',
                    id: 'creator',
                    remoteMethod: NotifyService.fetchUsersOfSearch,
                    inputInclude: true,
                },
                {
                    name: '更新人',
                    id: 'lastModifyUser',
                    remoteMethod: NotifyService.fetchUsersOfSearch,
                    inputInclude: true,
                },
            ];
            this.tableColumn = [
                {
                    id: 'id',
                    label: 'ID',
                },
                {
                    id: 'name',
                    label: '标签名',
                    disabled: true,
                },
                {
                    id: 'description',
                    label: '描述',
                    disabled: true,
                },
                {
                    id: 'relatedTaskTemplateNum',
                    label: '关联作业量',
                    disabled: true,
                },
                {
                    id: 'relatedScriptNum',
                    label: '关联脚本量',
                    disabled: true,
                },
                {
                    id: 'creator',
                    label: '创建人',
                },
                {
                    id: 'createTime',
                    label: '创建时间',
                },
                {
                    id: 'lastModifyUser',
                    label: '更新人',
                },
                {
                    id: 'lastModifyTime',
                    label: '更新时间',
                },
            ];
            const columnsCache = listColumnsCache.getItem(TABLE_COLUMN_CACHE);
            if (columnsCache) {
                this.selectedTableColumn = Object.freeze(columnsCache.columns);
                this.tableSize = columnsCache.size;
            } else {
                this.selectedTableColumn = Object.freeze([
                    { id: 'name' },
                    { id: 'description' },
                    { id: 'relatedTaskTemplateNum' },
                    { id: 'relatedScriptNum' },
                    { id: 'lastModifyUser' },
                    { id: 'lastModifyTime' },
                ]);
            }
        },
        methods: {
            /**
             * @desc 获取列表数据
             */
            fetchData () {
                this.$refs.list.$emit('onFetch', this.searchParams);
            },
            /**
             * @desc 列表数据刷新
             * @param { Object } data tag列表数据
             */
            handleListChange (data) {
                this.tagList = Object.freeze(data.data);
            },
            /**
             * @desc 表格自定时设置
             */
            handleSettingChange ({ fields, size }) {
                this.selectedTableColumn = Object.freeze(fields);
                this.tableSize = size;
                listColumnsCache.setItem(TABLE_COLUMN_CACHE, {
                    columns: fields,
                    size,
                });
            },
            /**
             * @desc 表格自定时设置
             * @param {Object} params 搜索条件
             */
            handleSearch (params) {
                this.searchParams = params;
                this.fetchData();
            },
            /**
             * @desc 显示新建账号弹层
             */
            handleCreate () {
                this.editData = {};
                this.isShowOperation = true;
            },
            /**
             * @desc 标签有更新重新获取列表数据
             */
            handleOperationChange () {
                this.fetchData();
                if (this.$refs.batchEditRelate) {
                    this.$refs.batchEditRelate.refresh();
                }
            },
            /**
             * @desc 批量流转重新获取列表数据
             */
            handleRelateChange () {
                this.fetchData();
                if (this.$refs.batchEditRelate) {
                    this.$refs.batchEditRelate.refresh();
                }
            },
            /**
             * @desc 编辑 账号
             * @param {Object} data 某一行tag数据
             */
            handleEdit (data) {
                this.editData = Object.freeze(data);
                this.isShowOperation = true;
            },
            /**
             * @desc 操作的 tag 数据
             * @param { Object } tag
             */
            handleEditRelate (tag) {
                this.editData = tag;
                this.isShowEditRelate = true;
            },
            /**
             * @desc 删除
             * @param { Number } id tag id
             *
             *  删除成功后刷新列表数据
             */
            handleDelete (id) {
                return TagManageService.remove({
                    id,
                }).then(() => {
                    this.fetchData();
                    this.messageSuccess('删除成功');
                });
            },
        },
    };
</script>
