<template>
    <div class="execute-global-variable" v-bkloading="{ isLoading }">
        <template v-if="!isLoading">
            <global-variable-layout v-if="taskVariables.length > 0">
                <global-variable
                    v-for="variable in taskVariables"
                    ref="variable"
                    :type="variable.type"
                    :key="variable.id"
                    :layout="variable.type === 3 ? 'vertical' : ''"
                    :data="variable" />
            </global-variable-layout>
            <empty v-else class="empty" />
        </template>
    </div>
</template>
<script>
    import TaskExecuteService from '@service/task-execute';
    import TaskHostNodeModel from '@model/task-host-node';
    import GlobalVariableLayout from '@components/global-variable/layout';
    import GlobalVariable from '@components/global-variable/view';
    import Empty from '@components/empty';

    export default {
        name: '',
        components: {
            GlobalVariableLayout,
            GlobalVariable,
            Empty,
        },
        props: {
            id: {
                type: [Number, String],
                default: 0,
            },
        },
        data () {
            return {
                isLoading: false,
                taskVariables: [{}, {}, {}],
            };
        },
        computed: {
            isShowVar () {
                return this.taskVariables.length > 0;
            },
        },
        watch: {
            id: {
                handler  (id) {
                    if (!id) {
                        return;
                    }
                    this.fetchTaskVariables(id);
                },
                immediate: true,
            },
        },
        methods: {
            fetchTaskVariables (id) {
                this.$request(TaskExecuteService.fetchStepInstanceParam({
                    id,
                }), () => {
                    this.isLoading = true;
                }).then((data) => {
                    this.taskVariables = Object.freeze(data.map(({ id, name, type, value, targetValue }) => ({
                        id,
                        name,
                        type,
                        defaultValue: value,
                        defaultTargetValue: new TaskHostNodeModel(targetValue || {}),
                    })));
                })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
<style lang='postcss' scoped>
    .execute-global-variable {
        min-height: calc(100vh - 120px);
    }

    .empty {
        padding-top: 80px;
    }
</style>
