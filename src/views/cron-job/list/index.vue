<template>
    <div class="cron-job-manage">
        <list-action-layout>
            <auth-button
                ref="create"
                theme="primary"
                auth="cron/create"
                @click="handleCreate"
                class="w120"
                v-test="{ type: 'button', value: 'createCrontab' }">
                {{ '新建' }}
            </auth-button>
            <template #right>
                <jb-search-select
                    ref="search"
                    @on-change="handleSearch"
                    :data="searchSelect"
                    :placeholder="'搜索任务ID，任务名称，更新人...'"
                    style="width: 480px;" />
            </template>
        </list-action-layout>
        <render-list
            ref="list"
            :data-source="getCronJobList"
            :size="tableSize"
            :search-control="() => $refs.search"
            v-test="{ type: 'list', value: 'crontab' }">
            <bk-table-column
                v-if="allRenderColumnMap.id"
                label="ID"
                prop="id"
                key="id"
                width="100"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.name"
                :label="'任务名称'"
                sortable
                prop="name"
                key="name"
                align="left"
                min-width="200"
                show-overflow-tooltip>
                <template slot-scope="{ row }">
                    <auth-component
                        :permission="row.canManage"
                        :resource-id="row.id"
                        auth="cron/view">
                        <span class="time-task-name" @click="handleViewDetail(row)">
                            {{ row.name }}
                        </span>
                        <span slot="forbid">{{ row.name }}</span>
                    </auth-component>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.planName"
                :label="'执行方案名称'"
                key="planName"
                min-width="200"
                align="left"
                show-overflow-tooltip>
                <template slot-scope="{ row }">
                    <div v-if="row.isPlanLoading" class="sync-fetch">
                        <div class="sync-fetch-loading">
                            <Icon type="sync-pending" svg style="color: #3a84ff;" />
                        </div>
                    </div>
                    <router-link
                        v-else
                        class="task-plan-text"
                        :to="{
                            name: 'viewPlan',
                            params: {
                                templateid: 4 || row.taskTemplateId,
                            },
                            query: {
                                from: 'cronJob',
                                viewPlanid: 4 || row.taskPlanId,
                            },
                        }">
                        {{ row.taskPlanName }}
                    </router-link>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.policeText"
                :label="'执行策略'"
                prop="policeText"
                key="policeText"
                width="180"
                align="left">
                <template slot-scope="{ row }">
                    <span
                        class="tips"
                        v-bk-tooltips.right="row.executeTimeTips">
                        {{ row.policeText }}
                    </span>
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
                sortable
                prop="lastModifyUser"
                key="lastModifyUser"
                width="140"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastModifyTime"
                :label="'更新时间'"
                prop="lastModifyTime"
                key="lastModifyTime"
                width="180"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.lastExecuteStatus"
                :label="'最新执行结果'"
                sortable
                prop="lastExecuteStatus"
                key="lastExecuteStatus"
                width="150"
                align="left">
                <template slot-scope="{ row }">
                    <Icon
                        svg
                        :type="row.statusIconType"
                        style="font-size: 16px; vertical-align: middle;" />
                    <span style="vertical-align: middle;">{{ row.statusText }}</span>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.successRateText"
                :label="'周期成功率'"
                :render-header="renderHeader"
                key="successRateText"
                width="150"
                align="left">
                <template slot-scope="{ row }">
                    <div v-if="row.isStatictisLoading" class="sync-fetch">
                        <div class="sync-fetch-loading">
                            <Icon type="sync-pending" svg style="color: #3a84ff;" />
                        </div>
                    </div>
                    <template v-else>
                        <template v-if="row.isRateEmpty">
                            <p v-html="row.successRateText" />
                        </template>
                        <template v-else>
                            <bk-popover placement="right" theme="light">
                                <p style="padding-right: 10px;" v-html="row.successRateText" />
                                <div slot="content" style="color: #63656e;">
                                    <div v-html="row.successRateTips" />
                                    <div v-if="row.showMoreFailAcion" class="more-fail-action">
                                        <bk-button
                                            text
                                            @click="handleHistoryRecord(row, true)">
                                            {{ '更多失败记录' }}
                                        </bk-button>
                                    </div>
                                </div>
                            </bk-popover>
                        </template>
                    </template>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'操作'"
                :resizable="false"
                width="200"
                key="action"
                fixed="right"
                align="left">
                <template slot-scope="{ row }">
                    <bk-switcher
                        :value="row.enable"
                        size="small"
                        theme="primary"
                        class="mr10"
                        @change="value => handleStatusChange(value, row)"
                        v-test="{ type: 'button', value: 'toggleCrontabStatus' }" />
                    <auth-button
                        auth="cron/edit"
                        :resource-id="row.id"
                        :permission="row.canManage"
                        class="time-task-edit mr10"
                        text
                        @click="handleEdit(row)"
                        v-test="{ type: 'button', value: 'editCrontab' }">
                        {{ '编辑' }}
                    </auth-button>
                    <jb-popover-confirm
                        :title="'确定删除该定时任务？'"
                        :content="'删除后不可恢复，请谨慎操作！'"
                        :confirm-handler="instance => handleDelete(row)">
                        <auth-button
                            auth="cron/delete"
                            :resource-id="row.id"
                            :permission="row.canManage"
                            text
                            v-test="{ type: 'button', value: 'deleteCrontab' }">
                            {{ '删除' }}
                        </auth-button>
                    </jb-popover-confirm>
                    <bk-button
                        text
                        @click="handleHistoryRecord(row)"
                        v-test="{ type: 'button', value: 'crontabExecRecord' }">
                        {{ '执行记录' }}
                    </bk-button>
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
            :is-show.sync="showOperation"
            v-bind="operationSidesliderInfo"
            :width="960">
            <task-operation
                v-if="showOperation"
                :id="editTaskId"
                :data="cronJobDetailInfo"
                @on-change="handleCronChange" />
        </jb-sideslider>
        <jb-sideslider
            :is-show.sync="showDetail"
            :title="'定时任务详情'"
            :width="960">
            <task-detail :data="cronJobDetailInfo" />
            <template #footer>
                <bk-button
                    theme="primary"
                    @click="handleToggelEdit"
                    v-test="{ type: 'button', value: 'showCrontabDetail' }">
                    {{ '编辑' }}
                </bk-button>
            </template>
        </jb-sideslider>
        <jb-sideslider
            :is-show.sync="showHistoryRecord"
            :show-footer="false"
            quick-close
            transfer
            :width="960">
            <div slot="header">
                <span>{{ '定时执行记录' }}</span>
                <span style="font-size: 12px; color: #313238;">（{{ cronJobDetailInfo.name }}）</span>
            </div>
            <history-record
                v-if="showHistoryRecord"
                :show-faild="showHistoryFailedRecord"
                :data="cronJobDetailInfo"
                @on-change="handleCronChange" />
        </jb-sideslider>
    </div>
</template>
<script>
       import TimeTaskService from '@service/time-task';
    import NotifyService from '@service/notify';
    import { listColumnsCache } from '@utils/cache-helper';
    import ListActionLayout from '@components/list-action-layout';
    import RenderList from '@components/render-list';
    import JbSearchSelect from '@components/jb-search-select';
    import JbSideslider from '@components/jb-sideslider';
    import JbPopoverConfirm from '@components/jb-popover-confirm';
    import TaskOperation from './components/operation';
    import TaskDetail from './components/detail';
    import HistoryRecord from './components/history-record';

    const TABLE_COLUMN_CACHE = 'cron_list_columns';

    export default {
        name: '',
        components: {
            ListActionLayout,
            RenderList,
            JbSearchSelect,
            JbSideslider,
            JbPopoverConfirm,
            TaskOperation,
            TaskDetail,
            HistoryRecord,
        },
        data () {
            return {
                showOperation: false,
                showDetail: false,
                showHistoryRecord: false,
                showHistoryFailedRecord: false,
                searchParams: [],
                cronData: {},
                loading: false,
                editTaskId: '',
                cronJobDetailInfo: {},
                currentOperate: 'create',
                historyRecordDialogTitle: '',
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
                if (this.cronJobDetailInfo.id) {
                    return {
                        title: '编辑定时任务',
                        okText: '保存',
                    };
                }
                return {
                    title: '新建定时任务',
                    okText: '提交',
                };
            },
        },
        watch: {
            '$route' () {
                this.initParseURL();
            },
        },
        created () {
            this.getCronJobList = TimeTaskService.timeTaskList;
            this.searchSelect = [
                {
                    name: 'ID',
                    id: 'cronJobId',
                    description: '将覆盖其它条件',
                    validate (values, item) {
                        const validate = (values || []).every(_ => /^(\d*)$/.test(_.name));
                        return !validate ? 'ID只支持数字' : true;
                    },
                },
                {
                    name: '任务名称',
                    id: 'name',
                    default: true,
                },
                {
                    name: '执行方案ID',
                    id: 'planId',
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
                    label: '任务名称',
                    disabled: true,
                },
                {
                    id: 'planName',
                    label: '执行方案名称',
                },
                {
                    id: 'policeText',
                    label: '执行策略',
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
                {
                    id: 'lastExecuteStatus',
                    label: '最新执行结果',
                    disabled: true,
                },
                {
                    id: 'successRateText',
                    label: '周期成功率',
                    disabled: true,
                },
            ];
            const columnsCache = listColumnsCache.getItem(TABLE_COLUMN_CACHE);
            if (columnsCache) {
                this.selectedTableColumn = Object.freeze(columnsCache.columns);
                this.tableSize = columnsCache.size;
            } else {
                this.selectedTableColumn = Object.freeze([
                    { id: 'name' },
                    { id: 'planName' },
                    { id: 'policeText' },
                    { id: 'lastModifyUser' },
                    { id: 'lastModifyTime' },
                    { id: 'lastExecuteStatus' },
                    { id: 'successRateText' },
                ]);
            }
        },
        mounted () {
            this.initParseURL();
        },
        methods: {
            /**
             * @desc 获取列表数据
             */
            fetchData () {
                this.$refs.list.$emit('onFetch', this.searchParams);
            },
            /**
             * @desc 解析 URL 参数
             */
            initParseURL () {
                // 在列表通过url指定查看定时任务详情
                const {
                    name,
                    cronJobId,
                    // mode 表示 url 访问的场景，
                    // create: 展示新建定时任务弹框
                    // detail: 展示定时任务详情弹框
                    // edit: 展示编辑定时任务弹框
                    mode,
                } = this.$route.query;
                if (mode === 'create') {
                    this.handleCreate();
                    return;
                }
            
                if (!name && !cronJobId) {
                    return;
                }
            
                const unWatch = this.$watch(() => this.$refs.list.isLoading, (isLoading) => {
                    if (!isLoading) {
                        if (mode === 'detail') {
                            setTimeout(() => {
                                // 通过url默认打开定时任务详情
                                const $firstTimeTaskName = this.$refs.list.$el.querySelector('.time-task-name');
                                if ($firstTimeTaskName) {
                                    $firstTimeTaskName.click();
                                }
                            });
                        } else if (mode === 'edit') {
                            setTimeout(() => {
                                // // 通过url默认打开定时任务编辑
                                const $firstTimeTask = this.$refs.list.$el.querySelector('.time-task-edit');
                                if ($firstTimeTask) {
                                    $firstTimeTask.click();
                                }
                            });
                        }
                    
                        unWatch();
                    }
                });
            },
            /**
             * @desc 表格表头渲染
             * @param { Function } h
             * @param { Object } data 表格配置信息
             * @returns { vNode }
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
                            <div style="font-weight: bold">{ '「周期成功率」采样规则和计算公式' }</div>
                            <div style="margin-top: 8px; font-weight: bold">{ '采样规则：' }</div>
                            <div>{ '近 24小时执行次数 ＞10，则 “分母” 为近 24 小时执行总数' }</div>
                            <div>{ '近 24小时执行次数 ≤ 10，则 “分母” 为近 10 次执行任务' }</div>
                            <div style="margin-top: 6px; font-weight: bold">{ '计算公式：' }</div>
                            <div>{ '成功次数(分子) / 分母 * 100 = 周期成功率（%）' }</div>
                        </div>
                    </bk-popover>
                </span>
                );
            },
            /**
             * @desc 表格列自定义
             * @param { Object } 列信息
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
             * @desc 搜索
             * @param { Object } searchParams
             */
            handleSearch (searchParams) {
                this.searchParams = searchParams;
                this.fetchData();
            },
            /**
             * @desc 查看执行记录
             * @param { Object } crontabData 定时任务信息
             * @param { Boolean } showFailed 显示失败记录
             */
            handleHistoryRecord (crontabData, showFailed = false) {
                this.cronJobDetailInfo = crontabData;
                this.showHistoryFailedRecord = showFailed;
                this.historyRecordDialogTitle = `定时执行记录${crontabData.name}`;
                this.showHistoryRecord = true;
            },
            /**
             * @desc 定时任务详情
             * @param { Object } crontabData 定时任务信息
             */
            handleViewDetail (crontabData) {
                this.cronJobDetailInfo = crontabData;
                this.showDetail = true;
            },
            /**
             * @desc 新建定时任务
             */
            handleCreate () {
                this.cronJobDetailInfo = {};
                this.showOperation = true;
            },
            /**
             * @desc 编辑定时任务
             * @param { Object } crontabData 定时任务信息
             */
            handleEdit (crontabData) {
                this.cronJobDetailInfo = crontabData;
                this.showOperation = true;
            },
            /**
             * @desc 从详情切换为编辑状态
             */
            handleToggelEdit () {
                this.showDetail = false;
                this.showOperation = true;
            },
            /**
             * @desc 定时任务有更新刷新列表数据
             */
            handleCronChange () {
                this.fetchData();
            },
            /**
             * @desc 切换定时任务状态
             * @param { Boolean } enable 开启状态
             * @param { Object } crontabData 定时任务信息
             */
            handleStatusChange (enable, crontabData) {
                const enableMemo = crontabData.enable;
                crontabData.enable = enable;
                TimeTaskService.timeTaskStatusUpdate({
                    id: crontabData.id,
                    enable,
                }).then(() => {
                    this.messageSuccess(enable ? '开启成功' : '关闭成功');
                })
                    .catch(() => {
                        crontabData.enable = enableMemo;
                    });
            },
            /**
             * @desc 删除定时任务
             * @param { Object } crontabData 定时任务信息
             *
             * 删除成功后刷新列表数据
             */
            handleDelete (crontabData) {
                return TimeTaskService.timeTaskDelete({
                    id: crontabData.id,
                }).then(() => {
                    this.messageSuccess('删除定时任务成功');
                    this.fetchData();
                    return true;
                });
            },
        },
    };
</script>
<style lang="postcss">
    @keyframes sync-fetch-loading {
        0% {
            transform: rotateZ(0);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }

    .cron-job-manage {
        .expression {
            font-size: 14px;
            color: #c4c6cc;
        }

        .more-fail-action {
            text-align: right;

            .bk-button-text {
                font-size: 12px;
            }
        }

        .time-task-name {
            display: inline-block;
            height: 18px;
            max-width: 100%;
            overflow: hidden;
            color: #3a84ff;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
            cursor: pointer;
        }

        .execute-result-text {
            &.success {
                &::before {
                    background: #2dcb56;
                }
            }

            &.fail {
                &::before {
                    background: #ea3636;
                }
            }

            &.waiting {
                &::before {
                    background: #dcdee5;
                }
            }

            &::before {
                display: inline-block;
                width: 8px;
                height: 8px;
                margin-right: 10px;
                border-radius: 50%;
                content: "";
            }
        }

        .sync-fetch {
            height: 13px;
        }

        .sync-fetch-loading {
            position: absolute;
            display: flex;
            width: 13px;
            height: 13px;
            animation: sync-fetch-loading 1s linear infinite;
        }

        .task-plan-text {
            display: inline-block;
            height: 18px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
        }
    }

</style>
