<template>
    <div class="cron-job-history-launch-record">
        <list-action-layout>
            <jb-search-select
                ref="search"
                :data="searchSelect"
                :parse-url="false"
                :placeholder="'搜索指定任务ID 或 根据字段筛选结果'"
                :append-value="searchAppendValue"
                @on-change="handleSearch"
                style="width: 510px;" />
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
            :data-source="fetchExecutionHistoryList"
            :search-control="() => $refs.search"
            ignore-url
            class="executive-history-table">
            <bk-table-column
                label="ID"
                prop="id"
                key="id"
                width="130"
                align="left">
                <template slot-scope="{ row }">
                    <bk-button text @click="handleGoDetail(row)">{{ row.id }}</bk-button>
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'任务状态'"
                prop="statusDesc"
                key="statusDesc"
                align="left">
                <template slot-scope="{ row }">
                    <span v-html="row.statusDescHtml" />
                </template>
            </bk-table-column>
            <bk-table-column
                :label="'执行人'"
                prop="operator"
                key="operator"
                width="160"
                align="left" />
            <bk-table-column
                :label="'开始时间'"
                prop="createTime"
                key="createTime"
                width="180"
                align="left" />
            <bk-table-column
                :label="'耗时时长'"
                prop="totalTimeText"
                key="totalTimeText"
                width="160"
                align="right" />
        </render-list>
    </div>
</template>
<script>
       import TaskExecuteService from '@service/task-execute';
    import NotifyService from '@service/notify';
    import { prettyDateTimeFormat } from '@utils/assist';
    import JbSearchSelect from '@components/jb-search-select';
    import ListActionLayout from '@components/list-action-layout';
    import RenderList from '@components/render-list';

    export default {
        name: '',
        components: {
            JbSearchSelect,
            ListActionLayout,
            RenderList,
        },
        props: {
            data: {
                type: Object,
                required: true,
            },
            showFaild: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                searchParams: {},
                defaultDateTime: [prettyDateTimeFormat(Date.now() - 29 * 86400000), ''],
                searchAppendValue: [],
            };
        },
        created () {
            this.fetchExecutionHistoryList = TaskExecuteService.fetchExecutionHistoryList;
            if (this.showFaild) {
                this.searchParams.status = 4;
                this.searchAppendValue = [
                    {
                        name: '任务状态',
                        id: 'status',
                        values: [{
                            id: this.searchParams.status,
                            name: '执行失败',
                        }],
                    },
                ];
            }
            const [startTime, endTime] = this.defaultDateTime;
            this.searchParams.startTime = startTime;
            this.searchParams.endTime = endTime;
            
            this.searchSelect = [
                {
                    name: 'ID',
                    id: 'taskInstanceId',
                    description: '搜索条件带任务ID时，将自动忽略其他条件',
                    default: true,
                    validate (values, item) {
                        const validate = (values || []).every(_ => /^(\d*)$/.test(_.name));
                        return !validate ? 'ID只支持数字' : true;
                    },
                },
                {
                    name: '任务状态',
                    id: 'status',
                    children: [
                        {
                            name: '等待执行',
                            id: 1,
                        },
                        {
                            name: '正在执行',
                            id: 2,
                        },
                        {
                            name: '执行成功',
                            id: 3,
                        },
                        {
                            name: '执行失败',
                            id: 4,
                        },
                        {
                            name: '等待确认',
                            id: 7,
                        },
                        {
                            name: '强制终止中',
                            id: 10,
                        },
                        {
                            name: '强制终止成功',
                            id: 11,
                        },
                        {
                            name: '强制终止失败',
                            id: 12,
                        },
                        {
                            name: '确认终止',
                            id: 13,
                        },
                    ],
                },
                {
                    name: '执行人',
                    id: 'operator',
                    remoteMethod: NotifyService.fetchUsersOfSearch,
                    inputInclude: true,
                },
            ];
            
            this.shortcuts = [
                {
                    text: '近1小时',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600000);
                        return [start, end];
                    },
                },
                {
                    text: '近12小时',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 43200000);
                        return [start, end];
                    },
                },
                {
                    text: '近1天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 86400000);
                        return [start, end];
                    },
                },
                {
                    text: '近7天',
                    value () {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 604800000);
                        return [start, end];
                    },
                },
            ];
        },
        mounted () {
            this.fetchData();
            this.$refs.datePicker.shortcut = {
                text: `${this.defaultDateTime[0]} ${'至今'}`,
            };
        },
        methods: {
            fetchData () {
                const searchParams = {
                    ...this.searchParams,
                    cronTaskId: this.data.id,
                };
                this.$refs.list.$emit('onFetch', searchParams);
            },
            handleSearch (payload) {
                const { startTime, endTime } = this.searchParams;
                this.searchParams = {
                    ...payload,
                    startTime,
                    endTime,
                };
                this.fetchData();
            },
            handleDateChange (date, type) {
                if (type === 'upToNow') {
                    this.setToNowText(date);
                }
                this.searchParams.startTime = date[0];// eslint-disable-line prefer-destructuring
                this.searchParams.endTime = type === 'upToNow' ? '' : date[1];
                this.fetchData();
            },
            handleGoDetail (taskInstance) {
                let router = null;
                if (taskInstance.isTask) {
                    router = this.$router.resolve({
                        name: 'historyTask',
                        params: {
                            id: taskInstance.id,
                        },
                    });
                } else {
                    router = this.$router.resolve({
                        name: 'historyStep',
                        params: {
                            taskInstanceId: taskInstance.id,
                        },
                        query: {
                            from: 'historyList',
                        },
                    });
                }
                window.open(router.href);
            },
        },
    };
</script>
