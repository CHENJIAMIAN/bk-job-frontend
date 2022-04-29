

<template>
    <div v-bkloading="{ isLoading }">
        <task-step-view :variable="variableList" :data="stepInfo" />
    </div>
</template>
<script>
    import TaskExecuteService from '@service/task-execute';
    import TaskStepModel from '@model/task/task-step';
    import GlobalVariableModel from '@model/task/global-variable';
    import TaskStepView from '@views/task-manage/common/render-task-step/task-step-view';

    export default {
        name: '',
        components: {
            TaskStepView,
        },
        props: {
            taskId: {
                type: Number,
                required: true,
            },
            id: {
                type: [Number, String],
            },
        },
        data () {
            return {
                isLoading: true,
                stepInfo: {},
                variableList: [],
            };
        },
        created () {
            this.isLoading = true;
            Promise.all([
                this.fetchStep(),
                this.fetchTaskVariables(),
            ]).finally(() => {
                this.isLoading = false;
            });
        },
        methods: {
            //  步骤详情
            fetchStep () {
                return TaskExecuteService.fetchStepInstance({
                    id: this.id,
                }).then((data) => {
                    this.stepInfo = Object.freeze(new TaskStepModel(data));
                });
            },
            fetchTaskVariables () {
                return TaskExecuteService.fetchStepInstanceParam({
                    id: this.taskId,
                }).then((data) => {
                    this.variableList = Object.freeze(data.map(({ id, name, type, value, targetValue }) => new GlobalVariableModel({
                        id,
                        name,
                        type,
                        defaultValue: value,
                        defaultTargetValue: targetValue,
                    })));
                });
            },
        },
    };
</script>
