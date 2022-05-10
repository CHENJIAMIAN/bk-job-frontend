<template>
    <div class="history-record-box" v-bkloading="{ isLoading }">
        <div v-if="!isLoading" class="history-record">
            <template v-if="recordList.length > 0">
                <scroll-faker>
                    <div
                        v-for="record in recordList"
                        :key="record.id"
                        class="record-item"
                        :class="record.statusClass"
                        @click="handleViewExecuteDetail(record)">
                        <div class="item-header">
                            <div class="record-name">{{ record.name }}</div>
                            <div class="record-label" v-html="record.statusDescHtml" />
                        </div>
                        <div class="item-body">
                            <span>{{ record.startTime }}</span>
                            <span class="record-operator">{{ record.operator }}</span>
                            <div class="record-total-time">{{ record.totalTimeText }}</div>
                        </div>
                    </div>
                </scroll-faker>
            </template>
            <Empty v-else :title="'暂无执行记录'" class="record-empty" />
            <div class="record-actions">
                <bk-radio-group
                    :value="recordOperator"
                    @change="handleRecordFilterChange"
                    class="record-filter">
                    <bk-radio-button value="">
                        {{ '全部' }}
                    </bk-radio-button>
                    <bk-radio-button :value="userInfo.username">
                        {{ '我执行' }}
                    </bk-radio-button>
                </bk-radio-group>
                <router-link :to="{ name: 'historyList' }" class="action-btn">
                    {{ '更多' }}
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import TaskExecuteService from '@service/task-execute';
    import UserService from '@service/user';
    import Empty from '@components/empty';

    export default {
        components: {
            Empty,
        },
        data () {
            return {
                userInfo: {},
                isLoading: true,
                recordOperator: '',
                recordList: [{},{},{}],
            };
        },
        created () {
            this.fetchUserInfo();
            this.fetchExecuteHistory();
        },
        methods: {
            /**
             * @desc 获取登录用户信息
            */
            fetchUserInfo () {
                UserService.fetchUserInfo()
                    .then((data) => {
                        this.userInfo = Object.freeze(data);
                    });
            },
            /**
             * @desc 获取任务执行历史
             *
             * 时间返回默认是 30 天
            */
            fetchExecuteHistory () {
                this.isLoading = true;

                const params = {
                    timeRange: 30,
                };
                if (this.recordOperator) {
                    params.operator = this.recordOperator;
                    params.startupModes = '1,2';
                }
                TaskExecuteService.fetchExecutionHistoryList(params)
                    .then((data) => {
                        this.recordList = Object.freeze(data.data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 筛选登录用户执行列表
             * @param {String} operator 登录用户名
            */
            handleRecordFilterChange (operator) {
                this.recordOperator = operator;
                this.fetchExecuteHistory();
            },
            /**
             * @desc 跳转任务执行详情页面
             * @param {Object} taskInstance 任务执行实例
            */
            handleViewExecuteDetail (taskInstance) {
                if (taskInstance.isTask) {
                    this.$router.push({
                        name: 'historyTask',
                        params: {
                            id: taskInstance.id,
                        },
                    });
                    return;
                }
                this.$router.push({
                    name: 'historyStep',
                    params: {
                        taskInstanceId: taskInstance.id,
                    },
                });
            },
        },
    };
</script>
<style lang='postcss'>
    .history-record-box {
        position: relative;
        width: 100%;
        height: calc(100vh - 484px);

        .history-record {
            height: 100%;
            padding-right: 15px;
            margin-right: -15px;
        }

        .record-empty {
            height: 100%;

            img {
                margin-top: -30px;
            }
        }

        .record-item {
            display: flex;
            flex-direction: column;
            padding: 3px 6px 5px;
            margin-bottom: 5px;
            line-height: 16px;
            color: #c4c6cc;
            cursor: pointer;

            &:hover {
                background: #fafbfd;

                .record-name {
                    color: #3a84ff;
                }
            }

            &.success,
            &.forced {
                .record-label {
                    background: rgb(45 203 157 / 14%);
                }
            }

            &.fail {
                .record-label {
                    background: rgb(255 86 92 / 14%);
                }
            }

            &.confirm {
                .record-label {
                    background: rgb(255 156 1 / 14%);
                }
            }

            &.loading {
                .record-label {
                    background: rgb(58 132 255 / 14%);
                }
            }

            .item-header,
            .item-body {
                display: flex;
            }

            .item-body {
                margin-top: 6px;
            }

            .record-name {
                margin-right: auto;
                color: #63656e;
            }

            .record-label {
                display: flex;
                height: 17px;
                padding: 0 3px;
                white-space: nowrap;
                border-radius: 2px;
                align-items: center;
                justify-content: center;
            }

            .record-operator {
                padding-left: 10px;
                margin-right: auto;
            }
        }

        .record-actions {
            position: absolute;
            top: -30px;
            right: 0;
            display: flex;
            align-items: center;
            height: 20px;

            .record-filter {
                .bk-radio-button-text {
                    width: 50px;
                    height: 22px;
                    min-width: 50px;
                    padding: 0;
                    font-size: 12px;
                    line-height: 22px;
                    text-align: center;
                }
            }

            .action-btn {
                width: 50px;
                height: 22px;
                line-height: 22px;
                color: #63656e;
                text-align: center;
                background: #fff;
                border: 1px solid #c4c6cc;
                border-radius: 2px;
            }
        }
    }
</style>
