

<template>
    <detail-layout mode="see" class="detail-layout-wrapper">
        <detail-item :label="$t('template.步骤类型：')">{{ stepTypeText }}</detail-item>
        <detail-item :label="$t('template.步骤名称：')">{{ data.name }}</detail-item>
        <component
            ref="stepCom"
            :is="stepCom"
            :variable="variable"
            :data="data" />
    </detail-layout>
</template>
<script>
    import I18n from '@/i18n';
    import DetailLayout from '@components/detail-layout';
    import DetailItem from '@components/detail-layout/item';
    import StepDistroFile from './distro-file';
    import StepExecScript from './exec-script';
    import StepArificial from './artificial';

    const STEP_TYPE_LIST = {
        1: I18n.t('template.执行脚本'),
        2: I18n.t('template.分发文件'),
        3: I18n.t('template.人工确认'),
    };

    export default {
        components: {
            StepDistroFile,
            StepExecScript,
            StepArificial,
            DetailLayout,
            DetailItem,
        },
        props: {
            variable: {
                type: Array,
                default: () => [],
            },
            data: {
                type: Object,
                default: () => ({}),
            },
        },
        computed: {
            stepTypeText () {
                return STEP_TYPE_LIST[this.data.type];
            },
            stepCom () {
                const taskStepMap = {
                    1: StepExecScript,
                    2: StepDistroFile,
                    3: StepArificial,
                };
                if (!Object.prototype.hasOwnProperty.call(taskStepMap, this.data.type)) {
                    return 'div';
                }
                return taskStepMap[this.data.type];
            },
        },
    };
</script>
<style lang="postcss" scoped>
    .detail-layout-wrapper {
        .detail-item {
            margin-bottom: 0;
        }
    }
</style>
