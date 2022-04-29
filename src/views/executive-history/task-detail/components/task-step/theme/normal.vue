

<template>
    <div class="execution-step-box theme-normal" :class="[data.displayStyle]">
        <div class="step-icon">
            <Icon :type="data.icon" />
        </div>
        <div class="theme-normal-wraper" @click="choose">
            <div class="step-desc">
                <div class="name-text">{{ data.name }}</div>
                <div v-if="!data.isNotStart" class="step-status-desc">
                    <span v-if="data.totalTime" class="time">{{ data.totalTimeText }}</span>
                    <Icon v-if="['fail', 'forced'].includes(data.displayStyle)" type="close" class="step-error-flag" />
                </div>
            </div>
            <div v-if="!data.isNotStart" class="step-info">
                <detail-layout>
                    <detail-item :label="`${$t('history.步骤名称')}：`">
                        {{ data.name }}
                    </detail-item>
                    <detail-item :label="`${$t('history.开始时间.label')}：`">
                        {{ data.startTime }}
                    </detail-item>
                    <detail-item :label="`${$t('history.结束时间')}：`">
                        {{ data.endTime || '--' }}
                    </detail-item>
                </detail-layout>
            </div>
        </div>
        <Icon :type="data.lastStepIcon" svg class="step-process" :class="data.lastStepIcon" />
        <img
            v-if="data.isDoing"
            class="loading-progress"
            src="/static/images/task-loading.png">
        <div class="step-action" @click.stop="">
            <step-action
                v-for="action in data.actions"
                :name="action"
                :key="action"
                :confirm-handler="operationCode => handleChangeStatus(operationCode)" />
        </div>
    </div>
</template>
<script>
    import DetailLayout from '@components/detail-layout';
    import DetailItem from '@components/detail-layout/item';
    import StepAction from '../../../../common/step-action';

    export default {
        components: {
            DetailLayout,
            DetailItem,
            StepAction,
        },
        props: {
            data: {
                type: Object,
            },
            choose: {
                type: Function,
            },
            handleChangeStatus: {
                type: Function,
            },
        },
    };
</script>
