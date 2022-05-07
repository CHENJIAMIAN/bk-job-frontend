

<template>
    <div>
        <list-action-layout>
            <auth-button
                theme="primary"
                auth="whitelist/create"
                @click="handleCreate"
                class="w120"
                v-test="{ type: 'button', value: 'createWhiteIP' }">
                {{ '新建' }}
            </auth-button>
            <template #right>
                <jb-search-select
                    ref="search"
                    @on-change="handleSearch"
                    :data="searchSelect"
                    :placeholder="'搜索IP，生效范围，目标业务'"
                    style="width: 480px;" />
            </template>
        </list-action-layout>
        <render-list
            ref="list"
            :data-source="getWhiteList"
            :size="tableSize"
            :search-control="() => $refs.search"
            v-test="{ type: 'list', value: 'whiteIP' }">
            <bk-table-column
                v-if="allRenderColumnMap.ip"
                label="IP"
                key="IP"
                align="left">
                <template slot-scope="{ row }">
                    <template v-if="row.ipList.length > 1">
                        <bk-popover placement="right" theme="light">
                            <span>{{ row.ip }}</span>
                            <div slot="content">
                                <p v-for="(item, index) in row.ipList" :key="index">{{ item }}</p>
                            </div>
                        </bk-popover>
                    </template>
                    <template v-else>
                        <span>{{ row.ip }}</span>
                    </template>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.scopeText"
                :label="'生效范围'"
                prop="scopeText"
                key="scopeText"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.appText"
                :label="'目标业务'"
                prop="appText"
                key="appText"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.creator"
                :label="'创建人'"
                prop="creator"
                key="creator"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.createTime"
                :label="'创建时间'"
                prop="createTime"
                key="createTime"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastModifier"
                :label="'更新人'"
                prop="lastModifier"
                key="lastModifier"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastModifyTime"
                :label="'更新时间'"
                prop="lastModifyTime"
                key="lastModifyTime"
                align="left" />
            <bk-table-column
                :label="'操作'"
                :resizable="false"
                prop="action"
                key="action"
                fixed="right"
                width="150"
                align="left">
                <template slot-scope="{ row }">
                    <auth-button
                        class="mr10"
                        :permission="row.canManage"
                        auth="whitelist/edit"
                        text
                        @click="handleEdit(row)"
                        v-test="{ type: 'button', value: 'createWhiteIP' }">
                        {{ '编辑' }}
                    </auth-button>
                    <jb-popover-confirm
                        :title="'确定删除该IP白名单？'"
                        :content="'删除后不可恢复，请谨慎操作！'"
                        :confirm-handler="() => handleDelete(row)">
                        <auth-button
                            :permission="row.canManage"
                            auth="whitelist/delete"
                            text
                            v-test="{ type: 'button', value: 'deleteWhiteIP' }">
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
        <jb-sideslider
            :is-show.sync="isShowCreateWhiteIp"
            v-bind="operationSidesliderInfo"
            :width="552">
            <operation
                ref="whiteIp"
                :data="editInfo"
                @on-update="handleWhiteIpUpdate" />
        </jb-sideslider>
    </div>
</template>
<script>
       import AppManageService from '@service/app-manage';
    import WhiteIpService from '@service/white-ip';
    import NotifyService from '@service/notify';
    import {
        listColumnsCache,
    } from '@utils/cache-helper';
    import ListActionLayout from '@components/list-action-layout';
    import RenderList from '@components/render-list';
    import JbSearchSelect from '@components/jb-search-select';
    import JbSideslider from '@components/jb-sideslider';
    import JbPopoverConfirm from '@components/jb-popover-confirm';
    import Operation from './components/operation';

    const TABLE_COLUMN_CACHE = 'white_ip_list_columns';

    export default {
        name: '',
        components: {
            ListActionLayout,
            RenderList,
            JbSearchSelect,
            JbSideslider,
            JbPopoverConfirm,
            Operation,
        },
        data () {
            return {
                searchParams: [],
                isShowCreateWhiteIp: false,
                editInfo: {},
                selectedTableColumn: [],
                tableSize: 'small',
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.$refs.list.isLoading;
            },
            allRenderColumnMap () {
                return this.selectedTableColumn.reduce((result, item) => {
                    result[item.id] = true;
                    return result;
                }, {});
            },
            operationSidesliderInfo () {
                if (this.editInfo.id) {
                    return {
                        title: '编辑IP白名单',
                        okText: '保存',
                    };
                }
                return {
                    title: '新建IP白名单',
                    okText: '提交',
                };
            },
        },
        created () {
            this.getWhiteList = WhiteIpService.whiteIpList;
            this.searchSelect = [
                {
                    name: 'IP',
                    id: 'ipStr',
                    default: true,
                },
                {
                    name: '目标业务',
                    id: 'appIdStr',
                    remoteMethod: this.fetchAppList,
                },
                {
                    name: '创建人',
                    id: 'creator',
                    remoteMethod: NotifyService.fetchUsersOfSearch,
                    inputInclude: true,
                },
                {
                    name: '更新人',
                    id: 'lastModifier',
                    remoteMethod: NotifyService.fetchUsersOfSearch,
                    inputInclude: true,
                },
            ];
            this.tableColumn = [
                {
                    id: 'ip',
                    label: 'IP',
                    disabled: true,
                },
                {
                    id: 'scopeText',
                    label: '生效范围',
                    disabled: true,
                },
                {
                    id: 'appText',
                    label: '目标业务',
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
                    id: 'lastModifier',
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
                    { id: 'ip' },
                    { id: 'scopeText' },
                    { id: 'appText' },
                    { id: 'lastModifier' },
                    { id: 'lastModifyTime' },
                ]);
            }
        },
        methods: {
            /**
             * @desc 获取表单数据
             */
            fetchData () {
                this.$refs.list.$emit('onFetch', this.searchParams);
            },
            /**
             * @desc 获取拥有权限的业务列表
             */
            fetchAppList () {
                return AppManageService.fetchAppList();
            },
            /**
             * @desc 获取生效范围列表
             */
            fetchActionScope () {
                return WhiteIpService.getScope();
            },
            /**
             * @desc 列表展示列设置
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
             * @desc 显示新建弹层
             */
            handleCreate () {
                this.editInfo = {};
                this.isShowCreateWhiteIp = true;
            },
            /**
             * @desc 列表字段搜索
             * @param {Object} params 搜索条件
             */
            handleSearch (params) {
                this.searchParams = params;
                this.fetchData();
            },
            /**
             * @desc 编辑一行数据
             * @param {Object} data  列表莫一行的数据
             */
            handleEdit (data) {
                this.isShowCreateWhiteIp = true;
                this.editInfo = data;
            },
            /**
             * @desc 删除一行数据
             * @param {Object} data 列表莫一行的数据
             */
            handleDelete (data) {
                return WhiteIpService.whiteDelete({
                    id: data.id,
                }).then(() => {
                    this.fetchData();
                    return true;
                });
            },
            /**
             * @desc 刷新列表数据
             */
            handleWhiteIpUpdate () {
                this.fetchData();
            },
        },
    };
</script>
