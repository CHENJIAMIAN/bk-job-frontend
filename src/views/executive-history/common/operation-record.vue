

<template>
    <div class="job-execute-record" v-bkloading="{ isLoading }">
        <template v-if="!isLoading">
            <bk-table v-if="data.length > 0" :data="data">
                <bk-table-column :label="$t('history.时间')" prop="createTime" width="180" />
                <bk-table-column :label="$t('history.操作人')" prop="operator" width="120" />
                <bk-table-column :label="$t('history.操作')" prop="operationName" width="120" />
                <bk-table-column
                    :label="$t('history.步骤')"
                    prop="stepName"
                    show-overflow-tooltip
                    class-name="step-name" />
                <bk-table-column :label="$t('history.详情')">
                    <template slot-scope="{ row }">
                        <bk-button
                            v-if="row.detailEnable"
                            theme="primary"
                            text
                            @click="handleView(row)">{{ row.detail }}</bk-button>
                        <div v-else>{{ row.detail }}</div>
                    </template>
                </bk-table-column>
            </bk-table>
            <empty v-else class="empty" />
        </template>
    </div>
</template>
<script>
    import I18n from '@/i18n';
    import TaskExecuteService from '@service/task-execute';
    import Empty from '@components/empty';

    export default {
        name: '',
        components: {
            Empty,
        },
        props: {
            id: {
                type: [Number, String],
                default: 0,
            },
            from: {
                type: String,
                default: '',
            },
        },
        data () {
            return {
                isLoading: true,
                data: [{},{},{}],
            };
        },
        created () {
            this.fetchTaskOperationLog();
        },
        methods: {
            fetchTaskOperationLog (id) {
                this.$request(TaskExecuteService.fetchTaskOperationLog({
                    id: this.id,
                }), () => {
                    this.isLoading = true;
                }).then((data) => {
                    this.data = data;
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            handleView (payload) {
                const routerInfo = {
                    name: 'historyStep',
                    params: {
                        taskInstanceId: payload.taskInstanceId,
                    },
                    query: {
                        stepInstanceId: payload.stepInstanceId,
                        retryCount: payload.retry,
                        from: this.from || this.$route.query.from,
                    },
                };
                // 跳转路由没变
                const { stepInstanceId, retryCount = 0 } = this.$route.query;
                if (parseInt(stepInstanceId, 10) === payload.stepInstanceId
                    && parseInt(retryCount, 10) === payload.retry) {
                    this.messageWarn(I18n.t('history.正在查看'));
                    return;
                }
                
                this.$emit('on-change');
                this.$router.push(routerInfo);
            },
        },
    };
</script>
<style lang='postcss'>
    .job-execute-record {
        min-height: calc(100vh - 120px);

        .empty {
            padding-top: 80px;
        }
    }
</style>
