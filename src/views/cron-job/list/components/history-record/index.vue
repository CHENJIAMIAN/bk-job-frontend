

<template>
    <div class="cron-job-history-record">
        <div class="record-tab-wraper">
            <div
                class="tab-item"
                :class="{ active: listTab === 'launch' }"
                @click="handleTabChange('launch')">
                <div class="tab-name">{{ '任务正常启动' }}</div>
                <Icon
                    v-if="isLaunchLoading"
                    type="sync-pending"
                    svg
                    class="loading-flag" />
                <div v-else class="tab-nums">{{ launchNums }}</div>
            </div>
            <div
                class="tab-item"
                :class="{ active: listTab === 'unlaunch' }"
                @click="handleTabChange('unlaunch')">
                <div class="tab-name">{{ '任务未能启动' }}</div>
                <Icon
                    v-if="isUnlaunchLoading"
                    type="sync-pending"
                    svg
                    class="loading-flag" />
                <div v-else class="tab-nums">{{ unLaunchNums }}</div>
            </div>
        </div>
        <component
            :is="listCom"
            :data="data"
            v-bind="$attrs"
            v-on="$listeners" />
    </div>
</template>
<script>
    import TaskExecuteService from '@service/task-execute';
    import TimeTaskService from '@service/time-task';
    import LaunchList from './launch-list';
    import UnlaunchList from './unlaunch-list';

    const listComMap = {
        launch: LaunchList,
        unlaunch: UnlaunchList,
    };

    export default {
        name: '',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        data () {
            return {
                listTab: 'launch',
                isLaunchLoading: true,
                isUnlaunchLoading: true,
                launchNums: 0,
                unLaunchNums: 0,
            };
        },
        computed: {
            listCom () {
                return listComMap[this.listTab];
            },
        },
        created () {
            this.fetchData();
        },
        methods: {
            handleTabChange (value) {
                this.listTab = value;
            },
            fetchData () {
                TaskExecuteService.fetchExecutionHistoryList({
                    cronTaskId: this.data.id,
                    startTime: '',
                    endTime: '',
                    start: 0,
                    pageSize: 1,
                    timeRange: 30,
                }).then((data) => {
                    this.launchNums = data.total;
                })
                    .finally(() => {
                        this.isLaunchLoading = false;
                    });
                TimeTaskService.fetchUnlaunchHistory({
                    cronTaskId: this.data.id,
                    start: 0,
                    pageSize: 1,
                    timeRange: 30,
                }).then((data) => {
                    this.unLaunchNums = data.total;
                })
                    .finally(() => {
                        this.isUnlaunchLoading = false;
                    });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .cron-job-history-record {
        .record-tab-wraper {
            display: flex;
            padding: 20px 30px 0;
            margin: -20px -30px 20px;
            background: #f5f6fa;
            border-bottom: 1px solid #dcdee5;

            .tab-item {
                display: flex;
                height: 32px;
                padding: 0 12px;
                margin-right: 20px;
                margin-bottom: -1px;
                font-size: 13px;
                line-height: 32px;
                color: #63656e;
                cursor: pointer;
                background: #e1e3eb;
                border: 1px solid #e1e3eb;
                border-bottom: none;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
                transition: all 0.15s;
                align-items: center;

                &.active {
                    color: ##313238;
                    background: #fff;
                    border-color: #dcdee5;

                    .tab-nums {
                        color: #63656e;
                        background: #ebecf0;
                    }

                    .loading-flag {
                        color: #fff;
                    }
                }
            }

            .tab-name {
                margin-right: 4px;
            }

            .tab-nums {
                height: 16px;
                padding: 0 4px;
                font-size: 12px;
                line-height: 16px;
                color: #63656e;
                background: #ebecf0;
                border-radius: 8px;
                transition: all 0.15s;
            }

            .loading-flag {
                color: #3a84ff;
                animation: sync-fetch-loading 1s linear infinite;
            }
        }
    }
</style>
