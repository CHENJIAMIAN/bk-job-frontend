
<template>
    <layout>
        <template #tag>
            <tag-panel
                ref="tagPanelRef"
                @on-change="handleTagPlanChange" />
        </template>
        <list-action-layout>
            <auth-button
                theme="primary"
                auth="script/create"
                @click="handleCreate"
                class="w120">
                {{ '新建' }}
            </auth-button>
            <bk-button
                @click="handleBatchEditTag">
                {{ '编辑标签' }}
            </bk-button>
            <template #right>
                <jb-search-select
                    ref="search"
                    @on-change="handleSearch"
                    :data="searchSelect"
                    :placeholder="'搜索脚本名称，类型，场景标签，更新人...'"
                    style="width: 420px;" />
            </template>
        </list-action-layout>
        <render-list
            ref="list"
            :data-source="getScriptList"
            :size="tableSize"
            selectable
            :search-control="() => $refs.search"
            @on-selection-change="handleSelection">
            <bk-table-column
                v-if="allRenderColumnMap.id"
                label="ID"
                prop="id"
                key="id"
                width="300"
                align="left" />
            <bk-table-column
                :label="'脚本名称'"
                prop="name"
                key="name"
                :min-width="300"
                sortable
                align="left">
                <template slot-scope="{ row }">
                    <auth-component
                        :permission="row.canView"
                        auth="script/view"
                        :resource-id="row.id">
                        <jb-edit-input
                            :key="row.id"
                            field="scriptName"
                            :rules="rules.name"
                            :value="row.name"
                            :remote-hander="val => handleUpdateScript(row.id, val)"
                            v-slot="{ value }">
                            <span
                                style="color: #3a84ff; cursor: pointer;"
                                @click="handleVersion(row)">
                                {{ value }}
                            </span>
                        </jb-edit-input>
                        <span slot="forbid">{{ row.name }}</span>
                    </auth-component>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.type"
                :label="'脚本语言'"
                sortable
                prop="type"
                key="type"
                width="120"
                align="left">
                <template slot-scope="{ row }">
                    <span>{{ row.typeName }}</span>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'场景标签'"
                sortable
                prop="tags"
                key="tags"
                width="200"
                align="left"
                class-name="edit-tag-column">
                <template slot-scope="{ row }">
                    <auth-component
                        :permission="row.canManage"
                        auth="script/edit"
                        :resource-id="row.id">
                        <jb-edit-tag
                            :key="row.id"
                            field="scriptTags"
                            :value="row.tags"
                            shortcurt
                            :remote-hander="val => handleUpdateScript(row.id, val)" />
                        <div slot="forbid">{{ row.tagsText }}</div>
                    </auth-component>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.related"
                :label="'被引用'"
                prop="related"
                key="related"
                width="120"
                :render-header="renderHeader"
                align="right">
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        class="mr20"
                        v-bk-tooltips.right.allowHtml="`
                                    <div>${'作业模板引用'}: ${row.relatedTaskTemplateNum}</div>
                                    <div>${'执行方案引用'}: ${row.relatedTaskPlanNum}</div>`"
                        @click="handleShowRelated(row)">
                        <span>{{ row.relatedTaskTemplateNum }}</span>
                        <span> / </span>
                        <span>{{ row.relatedTaskPlanNum }}</span>
                    </bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.version"
                :label="'线上版本'"
                show-overflow-tooltip
                prop="version"
                key="version"
                width="140"
                align="left">
                <template slot-scope="{ row }">
                    <span> {{ row.version || '--' }} </span>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.creator"
                :label="'创建人'"
                sortable
                show-overflow-tooltip
                prop="creator"
                key="creator"
                width="140"
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
                width="160"
                prop="lastModifyUser"
                key="lastModifyUser"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastModifyTime"
                :label="'更新时间'"
                width="180"
                prop="lastModifyTime"
                key="lastModifyTime"
                align="left" />
            <bk-table-column
                :label="'操作'"
                :resizable="false"
                fixed="right"
                key="action"
                width="170"
                align="left">
                <template slot-scope="{ row }">
                    <auth-button
                        class="mr10"
                        text
                        :permission="row.canView"
                        auth="script/view"
                        :resource-id="row.id"
                        @click="handleVersion(row)">
                        {{ '版本管理' }}
                    </auth-button>
                    <span
                        class="mr10"
                        :tippy-tips="row.isExecuteDisable ? '该脚本没有 “线上版本” 可执行，请前往版本管理内设置。' : ''">
                        <auth-button
                            text
                            :permission="row.canView"
                            auth="script/execute"
                            :resource-id="row.id"
                            
                            @click="handleExec(row)">
                            {{ '去执行' }}
                        </auth-button>
                    </span>
                    <jb-popover-confirm
                        :title="'确定删除该脚本？'"
                        :content="'注意！脚本内的所有版本也将被清除'"
                        :confirm-handler="() => handleDelete(row)">
                        <auth-button
                            :permission="row.canManage"
                            auth="script/delete"
                            :resource-id="row.id"
                            text>
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
        <jb-dialog
            v-model="isShowBatchEditTag"
            :title="'编辑标签'"
            header-position="left"
            :ok-text="'确定'"
            :width="480">
            <batch-edit-tag
                v-if="isShowBatchEditTag"
                :script-list="listSelect"
                @on-change="handleBatchEditChange" />
        </jb-dialog>
        <jb-sideslider
            :is-show.sync="showRelated"
            :show-footer="false"
            quick-close
            :title="'被引用'"
            :width="695">
            <script-related-info
                from="scriptList"
                :info="relatedScriptInfo" />
        </jb-sideslider>
    </layout>
</template>
<script>
       import TagManageService from '@service/tag-manage';
    import PublicTagManageService from '@service/public-tag-manage';
    import ScriptService from '@service/script-manage';
    import PublicScriptService from '@service/public-script-manage';
    import NotifyService from '@service/notify';
    import { checkPublicScript } from '@utils/assist';
    import { scriptNameRule } from '@utils/validator';
    import { listColumnsCache } from '@utils/cache-helper';
    import ListActionLayout from '@components/list-action-layout';
    import RenderList from '@components/render-list';
    import JbSearchSelect from '@components/jb-search-select';
    import JbEditInput from '@components/jb-edit/input';
    import JbEditTag from '@components/jb-edit/tag';
    import ScriptRelatedInfo from '../common/script-related-info';
    import Layout from './components/layout';
    import TagPanel from './components/tag-panel';
    import BatchEditTag from './components/batch-edit-tag';

    const TABLE_COLUMN_CACHE = 'script_list_columns';

    export default {
        name: '',
        components: {
            ListActionLayout,
            RenderList,
            ScriptRelatedInfo,
            JbSearchSelect,
            JbEditInput,
            JbEditTag,
            Layout,
            TagPanel,
            BatchEditTag,
        },
        data () {
            return {
                showRelated: false,
                isShowBatchEditTag: false,
                listSelect: [],
                relatedScriptInfo: {
                    id: 0,
                },
                searchParams: {},
                selectedTableColumn: [],
                tableSize: 'small',
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.$refs.list.isLoading;
            },
            isBatchEditTagDisabled () {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < this.listSelect.length; i++) {
                    const current = this.listSelect[i];
                    if (!current.canManage) {
                        return true;
                    }
                }
                return this.listSelect.length < 1;
            },
            allRenderColumnMap () {
                return this.selectedTableColumn.reduce((result, item) => {
                    result[item.id] = true;
                    return result;
                }, {});
            },
        },
        created () {
            // 公共脚本
            this.isPublicScript = checkPublicScript(this.$route);
            this.serviceHandler = this.isPublicScript ? PublicScriptService : ScriptService;
            this.tagSericeHandler = this.isPublicScript ? PublicTagManageService : TagManageService;
            this.getScriptList = this.serviceHandler.scriptList;

            this.searchClass = {};

            this.searchSelect = [
                {
                    name: 'ID',
                    id: 'scriptId',
                    description: '将覆盖其它条件',
                },
                {
                    name: '脚本名称',
                    id: 'name',
                    default: true,
                },
                {
                    name: '脚本语言',
                    id: 'type',
                    remoteMethod: PublicScriptService.scriptTypeList,
                    remoteExecuteImmediate: true,
                },
                {
                    name: '场景标签',
                    id: 'tags',
                    remoteMethod: this.tagSericeHandler.fetchTagOfSearch,
                    remoteExecuteImmediate: true,
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
                    label: '脚本名称',
                    disabled: true,
                },
                {
                    id: 'tags',
                    label: '场景标签',
                    disabled: true,
                },
                {
                    id: 'type',
                    label: '脚本语言',
                },
                {
                    id: 'related',
                    label: '被引用',
                },
                {
                    id: 'version',
                    label: '线上版本',
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
                    { id: 'tags' },
                    { id: 'type' },
                    { id: 'related' },
                    { id: 'version' },
                    { id: 'related' },
                    { id: 'version' },
                    { id: 'lastModifyUser' },
                    { id: 'lastModifyTime' },
                ]);
            }
            
            this.rules = {
                name: [
                    {
                        required: true,
                        message: '脚本名称必填',
                        trigger: 'blur',
                    },
                    {
                        validator: scriptNameRule.validator,
                        message: scriptNameRule.message,
                        trigger: 'blur',
                    },
                ],
            };
        },
        methods: {
            /**
             * @desc 获取列表数据
             */
            fetchData () {
                // 合并左侧分类和右侧搜索的查询条件
                const searchParams = { ...this.searchParams };
                if (this.searchClass.panelType) {
                    searchParams.panelType = this.searchClass.panelType;
                }
                if (this.searchClass.panelTag) {
                    searchParams.panelTag = this.searchClass.panelTag;
                }
                this.$refs.list.$emit('onFetch', {
                    ...searchParams,
                });
            },
            /**
             * @desc 切换分类
             * @param {String} searchClass 最新分类
             */
            handleTagPlanChange (searchClass) {
                this.searchClass = searchClass;
                this.fetchData();
            },
            /**
             * @desc 批量编辑 tag
             */
            handleBatchEditTag () {
                this.isShowBatchEditTag = true;
            },
            /**
             * @desc tag 批量编辑完成需要刷新列表和 tag 面板数据
             */
            handleBatchEditChange () {
                this.fetchData();
                this.$refs.tagPanelRef.init();
            },
            /**
             * @desc 列表搜索
             * @param {Object} params 搜索条件
             */
            handleSearch (params) {
                this.searchParams = params;
                this.fetchData();
            },
            /**
             * @desc 新建脚本
             */
            handleCreate () {
                if (this.isPublicScript) {
                    this.$router.push({
                        name: 'createPublicScript',
                    });
                    return;
                }
                this.$router.push({
                    name: 'createScript',
                });
            },
            /**
             * @desc 更新脚本字段
             * @param {String} id 脚本id
             * @param {Object} payload 字段名和值
             */
            handleUpdateScript (id, payload) {
                return this.serviceHandler.scriptUpdateMeta({
                    id,
                    ...payload,
                    updateField: Object.keys(payload)[0],
                }).then(() => {
                    if (this.$refs.tagPanelRef) {
                        this.$refs.tagPanelRef.init();
                    }
                });
            },
            /**
             * @desc 选择脚本
             * @param {Array} selectScriptList 选择的脚本
             */
            handleSelection (selectScriptList) {
                this.listSelect = Object.freeze(selectScriptList);
            },
            /**
             * @desc 自定义列表配置
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
             * @desc 脚本版本列表
             * @param {Object} scriptData 脚本数据
             */
            handleVersion (scriptData) {
                if (this.isPublicScript) {
                    this.$router.push({
                        name: 'publicScriptVersion',
                        params: {
                            id: 4 || scriptData.id,
                        },
                    });
                    return;
                }
                this.$router.push({
                    name: 'scriptVersion',
                    params: {
                        id: 4 || scriptData.id,
                    },
                });
            },
            /**
             * @desc 执行脚本
             * @param {Object} scriptData 脚本数据
             */
            handleExec (scriptData) {
                // this.serviceHandler.getOneOnlineScript({
                //     id: scriptData.id,
                //     publicScript: this.isPublicScript,
                // }).then((script) => {
                //     if (!script) {
                //         this.$bkMessage({
                //             limit: 1,
                //             theme: 'error',
                //             message: '操作失败！请前往「版本管理」设置线上版后重试',
                //         });
                //         return;
                //     }
                this.$router.push({
                    name: 'fastExecuteScript',
                    params: {
                        taskInstanceId: 0,
                        scriptVersionId: 0,
                    },
                });
                // });
            },
            /**
             * @desc 删除脚本
             * @param {Object} scriptData 脚本数据
             */
            handleDelete (scriptData) {
                if (!scriptData.isEnableRemove) {
                    this.messageError('脚本正被作业引用中，无法删除');
                    return false;
                }
                return this.serviceHandler.scriptDelete({
                    id: scriptData.id,
                }).then(() => {
                    this.fetchData();
                    this.messageSuccess('删除成功');
                    return true;
                });
            },
            /**
             * @desc 脚本引用数据列表
             * @param {String} mode 引用的模板、执行方案
             * @param {Object} scriptData 脚本数据
             */
            handleShowRelated (scriptData) {
                this.showRelated = true;
                this.relatedScriptInfo = scriptData;
            },
            /**
             * @desc 自定义表头
             */
            renderHeader (h, data) {
                return (
                    <span>
                        <span>{ data.column.label }</span>
                        <bk-popover>
                            <icon
                                type="circle-italics-info"
                                style="margin-left: 8px; font-size: 12px;" />
                            <div slot="content">
                                <div>{ '显示被作业引用的次数' }</div>
                                <div>{ '显示被执行方案引用的次数' }</div>
                            </div>
                        </bk-popover>
                    </span>
                );
            },
        },
    };
</script>
