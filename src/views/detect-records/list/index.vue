<template>
    <div class="detect-records-list-page">
        <list-action-layout>
            <jb-search-select
                ref="search"
                @on-change="handleSearch"
                :data="searchSelect"
                :placeholder="'搜索拦截ID，表达式，业务，执行人，执行方式，调用方，动作…'"
                style="width: 480px;" />
            <template #right>
                <bk-date-picker
                    ref="datePicker"
                    :value="defaultDateTime"
                    :placeholder="'选择日期'"
                    :shortcuts="shortcuts"
                    type="datetimerange"
                    :shortcut-close="true"
                    :use-shortcut-text="true"
                    :clearable="false"
                    up-to-now
                    @change="handleDateChange" />
            </template>
        </list-action-layout>
        <render-list
            ref="list"
            :size="tableSize"
            :data-source="fetchDetectRecordsList"
            :search-control="() => $refs.search"
            v-test="{ type: 'list', value: 'detectRecord' }">
            <bk-table-column
                v-if="allRenderColumnMap.id"
                label="ID"
                prop="id"
                key="id"
                width="80"
                align="left">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.ruleExpression"
                :label="'表达式'"
                prop="ruleExpression"
                key="ruleExpression"
                align="left"
                show-overflow-tooltip />
            <bk-table-column
                v-if="allRenderColumnMap.appId"
                :label="'业务'"
                prop="appName"
                key="appName"
                width="200"
                align="left">
                <template slot-scope="{ row }">
                    <span>[{{ row.appId }}] {{ row.appName }}</span>
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.operator"
                :label="'执行人'"
                prop="operator"
                key="operator"
                width="140"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.statusDesc"
                :label="'执行时间'"
                prop="createTime"
                key="createTime"
                width="200"
                align="left">
                <template slot-scope="{ row }">
                    {{ row.getCreatTimes }}
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.startupMode"
                :label="'执行方式'"
                prop="startupMode"
                key="startupMode"
                width="140"
                align="left">
                <template slot-scope="{ row }">
                    {{ row.getStartupModeHtml }}
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.client"
                :label="'调用方'"
                prop="client"
                key="client"
                width="150"
                align="left" />
            <bk-table-column
                v-if="allRenderColumnMap.action"
                :label="'动作'"
                :render-header="renderPatternHeader"
                prop="mode"
                key="mode"
                width="150">
                <template slot-scope="{ row }">
                    <span v-html="row.getActionHtml" />
                </template>
            </bk-table-column>
            <bk-table-column
                v-if="allRenderColumnMap.scriptLanguage"
                :label="'脚本语言'"
                prop="scriptLanguage"
                key="scriptLanguage"
                width="150"
                align="left">
                <template slot-scope="{ row }">
                    {{ row.getSctiptTypeHtml }}
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'操作'"
                key="action"
                fixed="right"
                align="left"
                width="100">
                <template slot-scope="{ row }">
                    <bk-button
                        text
                        @click="handleShowScriptContent(row)"
                        v-test="{ type: 'button', value: 'viewDetectScript' }">
                        {{ '查看脚本' }}
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
            :is-show.sync="isShowScriptContent"
            :title="'脚本内容'"
            :show-footer="false"
            :width="900">
            <render-script-content :data="scriptData" />
        </jb-sideslider>
    </div>
</template>

<script>
       import {
        prettyDateTimeFormat,
    } from '@utils/assist';
    import {
        listColumnsCache,
    } from '@utils/cache-helper';
    import NotifyService from '@service/notify';
    import AppManageService from '@service/app-manage';
    import DangerousRecordService from '@service/dangerous-record';
    import RenderList from '@components/render-list';
    import JbSideslider from '@components/jb-sideslider';
    import JbSearchSelect from '@components/jb-search-select';
    import ListActionLayout from '@components/list-action-layout';
    import RenderScriptContent from './components/render-script-content';

    const TABLE_COLUMN_CACHE = 'detect_records_list_columns';

    export default {
        name: 'detectRecordsList',
        components: {
            RenderList,
            JbSideslider,
            JbSearchSelect,
            ListActionLayout,
            RenderScriptContent,
        },
        data () {
            return {
                searchParams: {},
                defaultDateTime: [
                    '', '',
                ],
                selectedTableColumn: [],
                tableSize: 'small',
                scriptData: {},
                isShowScriptContent: false,
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
        },
        created () {
            this.parseDefaultDateTime();
            this.fetchDetectRecordsList = DangerousRecordService.recordList;
            this.searchSelect = [
                {
                    name: '拦截ID',
                    id: 'id',
                    default: true,
                },
                {
                    name: '表达式',
                    id: 'ruleExpression',
                },
                {
                    name: '业务',
                    id: 'appId',
                    remoteMethod: () => AppManageService.fetchWholeAppList().then(({ data }) => data),
                },
                {
                    name: '执行人',
                    id: 'operator',
                    remoteMethod: NotifyService.fetchUsersOfSearch,
                    inputInclude: true,
                },
                {
                    name: '执行方式',
                    id: 'startupMode',
                    children: [
                        {
                            name: '页面执行',
                            id: 1,
                        },
                        {
                            name: '定时执行',
                            id: 3,
                        },
                        {
                            name: 'API调用',
                            id: 2,
                        },
                    ],
                },
                {
                    name: '调用方',
                    id: 'client',
                },
                {
                    name: '动作',
                    id: 'action',
                    children: [
                        {
                            name: '扫描',
                            id: 1,
                        },
                        {
                            name: '拦截',
                            id: 2,
                        },
                    ],
                },
            ];
            this.shortcuts = [
                {
                    text: '近1小时',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600000);
                        return [
                            start, end,
                        ];
                    },
                },
                {
                    text: '近12小时',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 43200000);
                        return [
                            start, end,
                        ];
                    },
                },
                {
                    text: '近1天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 86400000);
                        return [
                            start, end,
                        ];
                    },
                },
                {
                    text: '近7天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 604800000);
                        return [
                            start, end,
                        ];
                    },
                },
            ];
            this.tableColumn = [
                {
                    id: 'id',
                    label: 'ID',
                    disabled: true,
                },
                {
                    id: 'ruleExpression',
                    label: '表达式',
                },
                {
                    id: 'appId',
                    label: '业务',
                },
                {
                    id: 'operator',
                    label: '执行人',
                },
                {
                    id: 'statusDesc',
                    label: '执行时间',
                },
                {
                    id: 'startupMode',
                    label: '执行方式',
                },
                {
                    id: 'client',
                    label: '调用方',
                },
                {
                    id: 'action',
                    label: '动作',
                },
                {
                    id: 'scriptLanguage',
                    label: '脚本语言',
                },
            ];
            const columnsCache = listColumnsCache.getItem(TABLE_COLUMN_CACHE);
            if (columnsCache) {
                this.selectedTableColumn = Object.freeze(columnsCache.columns);
                this.tableSize = columnsCache.size;
            } else {
                this.selectedTableColumn = Object.freeze([
                    { id: 'id' },
                    { id: 'ruleExpression' },
                    { id: 'appId' },
                    { id: 'operator' },
                    { id: 'statusDesc' },
                    { id: 'startupMode' },
                    { id: 'client' },
                    { id: 'action' },
                    { id: 'scriptLanguage' },
                ]);
            }
        },
        methods: {
            /**
             * @desc 获取列表数据
             */
            fetchData () {
                const searchParams = {
                    ...this.searchParams,
                };
                this.$refs.list.$emit('onFetch', searchParams);
            },

            /**
             * @desc 日期值显示为至今
             * @param {Array} date 日期值
             */
            setToNowText (date) {
                this.$refs.datePicker.shortcut = {
                    text: `${date[0]} ${'至今'}`,
                };
            },
            /**
             * @desc 列表默认的执行时间筛选值
             */
            parseDefaultDateTime () {
                const defaultDateTime = [
                    '', '',
                ];
                const searchParams = {
                    startTime: '',
                    endTime: '',
                };
                
                const currentTime = new Date().getTime();
                
                if (Object.prototype.hasOwnProperty.call(this.$route.query, 'startTime')) {
                    defaultDateTime[0] = this.$route.query.startTime;
                } else {
                    defaultDateTime[0] = prettyDateTimeFormat(currentTime - 86400000);
                }
                
                searchParams.startTime = defaultDateTime[0]; // eslint-disable-line prefer-destructuring

                if (Object.prototype.hasOwnProperty.call(this.$route.query, 'endTime')) {
                    defaultDateTime[1] = this.$route.query.endTime;
                    searchParams.endTime = this.$route.query.endTime;
                } else {
                    defaultDateTime[1] = prettyDateTimeFormat(currentTime);
                    searchParams.endTime = '';
                }
                this.defaultDateTime = defaultDateTime;
                this.searchParams = searchParams;
                if (!searchParams.endTime) {
                    setTimeout(() => {
                        this.setToNowText(this.defaultDateTime);
                    });
                }
            },
            /**
             * @desc 自定义表头
             */
            renderPatternHeader (h, data) {
                const tips = [
                    {
                        title: '【扫描】',
                        content: '命中规则的脚本执行任务仅会做记录，不会拦截',
                    },
                    {
                        title: '【拦截】',
                        content: '命中规则的脚本执行任务会被记录，并中止运行',
                    },
                ];
                return (
                <div class="pattern-head">
                    <span>{data.column.label} </span>
                    <bk-popover placement="right-start" width="290">
                        <Icon type="info" style="color: #C4C6CC" />
                        <div slot="content">
                            <div class="detect-records-tips-content">
                                {
                                    tips.map(item => (
                                        <div class="item">
                                            <p>{ item.title }</p>
                                            <p>{ item.content }</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </bk-popover>
                </div>
                );
            },
            /**
             * @desc 列表搜索
             * @param {Object} params 搜索条件
             */
            handleSearch (payload) {
                const { startTime, endTime } = this.searchParams;
                this.searchParams = {
                    ...payload,
                    startTime,
                    endTime,
                };
                this.fetchData();
            },

            /**
             * @desc 时间选择器改变时间并查询数据
             * @param {Array} date 时间
             */
            handleDateChange (date) {
                this.searchParams.startTime = date[0];// eslint-disable-line prefer-destructuring
                this.searchParams.endTime = date[1];// eslint-disable-line prefer-destructuring
                this.fetchData();
            },

            /**
             * @desc 自定义表格显示
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
             * @desc 查看脚本内容
             * @param {Object} row 用户点击当前行的检测记录数据
             */

            handleShowScriptContent (row) {
                this.isShowScriptContent = true;
                this.scriptData = Object.freeze(row);
            },
            
        },
    };
</script>

<style lang="postcss">
    .detect-records-tips-content {
        font-size: 12px;

        .item {
            margin-bottom: 10px;
        }
    }
</style>
