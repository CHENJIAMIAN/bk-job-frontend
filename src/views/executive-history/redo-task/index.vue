

<template>
    <div class="setting-variable" v-bkloading="{ isLoading }">
        <h2 class="title">{{ '全局变量' }}</h2>
        <smart-action offset-target="variable-value">
            <global-variable-layout>
                <global-variable
                    v-for="variable in taskVariables"
                    ref="variable"
                    :type="variable.type"
                    :key="variable.id"
                    :data="variable" />
            </global-variable-layout>
            <template #action>
                <bk-button
                    theme="primary"
                    class="w120 mr10"
                    :loading="isSubmiting"
                    @click="handleGoExec">
                    {{ '执行' }}
                </bk-button>
                <bk-button @click="handleCancle">{{ '取消' }}</bk-button>
            </template>
        </smart-action>
        <element-teleport v-if="taskName">
            <div style="font-size: 12px; color: #63656e;">（{{ taskName }}）</div>
        </element-teleport>
    </div>
</template>
<script>
       import TaskExecuteService from '@service/task-execute';
    import TaskHostNodeModel from '@model/task-host-node';
    import GlobalVariableLayout from '@components/global-variable/layout';
    import GlobalVariable from '@components/global-variable/edit';

    export default {
        name: '',
        components: {
            GlobalVariableLayout,
            GlobalVariable,
        },
        data () {
            return {
                taskName: '123',
                taskVariables: [],
                isLoading: true,
                isSubmiting: false,
                templateId: 0,
                taskId: 0,
            };
        },
        computed: {
            isSkeletonLoading () {
                return this.isLoading;
            },
        },
        created () {
            this.taskInstanceId = this.$route.params.taskInstanceId;
            this.fetchData();
        },
        methods: {
            /**
             * @desc 获取任务详情数据
             */
            fetchData () {
                TaskExecuteService.fetchTaskInstance({
                    id: this.taskInstanceId,
                }).then((data) => {
                    this.taskName = data.taskInstance.name;
                    this.taskVariables = Object.freeze(data.variables.map(({
                        id,
                        name,
                        type,
                        value,
                        targetValue,
                        changeable,
                    }) => ({
                        id,
                        name,
                        type,
                        defaultValue: value,
                        defaultTargetValue: new TaskHostNodeModel(targetValue || {}),
                        changeable,
                    })));
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            /**
             * @desc 任务重做执行
             */
            handleGoExec () {
                if (!this.$refs.variable) {
                    return;
                }
                Promise.all(this.$refs.variable.map(item => item.validate()))
                    .then((taskVariables) => {
                        this.isSubmiting = true;
                        TaskExecuteService.redoTask({
                            taskInstanceId: this.taskInstanceId,
                            taskVariables: taskVariables.map(({ id, name, type, value, targetValue }) => ({
                                id,
                                name,
                                type,
                                value,
                                targetValue,
                            })),
                        }).then(({ taskInstanceId }) => {
                            this.$bkMessage({
                                theme: 'success',
                                message: '操作成功',
                            });
                            window.changeAlert = false;
                            this.$router.push({
                                name: 'historyTask',
                                params: {
                                    id: taskInstanceId,
                                },
                            });
                        })
                            .catch(() => {
                                this.isSubmiting = false;
                            });
                    });
            },
            /**
             * @desc 取消重做
             */
            handleCancle () {
                this.routerBack();
            },
            /**
             * @desc 路由回退
             */
            routerBack () {
                this.$router.push({
                    name: 'historyList',
                });
            },
        },
    };
</script>
<style lang='postcss'>
    .setting-variable {
        .title {
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1;
            color: #313238;
        }

        .variable-list {
            display: inline-block;
        }
    }

    .setting-wariable-operate {
        margin-left: 88px;
    }
</style>
