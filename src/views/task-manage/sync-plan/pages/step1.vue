

<template>
    <layout>
        <div class="sync-plan-step1">
            <detail-layout>
                <detail-item
                    :label="$t('template.全局变量.label')"
                    style="margin-bottom: 20px;">
                    <render-global-var
                        :list="templateVariableList"
                        mode="diff"
                        :default-field="$t('template.变量值')"
                        :diff="variableDiff" />
                </detail-item>
                <detail-item :label="$t('template.执行步骤')">
                    <render-task-step
                        :list="templateStepList"
                        mode="diff"
                        :diff="stepDiff" />
                </detail-item>
            </detail-layout>
        </div>
        <template #footer>
            <bk-button
                @click="handleCancel">
                {{ $t('template.取消') }}
            </bk-button>
            <bk-button
                theme="primary"
                class="w120"
                @click="handleNext">
                {{ $t('template.下一步') }}
            </bk-button>
        </template>
    </layout>
</template>
<script>
    import DetailLayout from '@components/detail-layout';
    import DetailItem from '@components/detail-layout/item';
    import Layout from '../components/layout';
    import RenderGlobalVar from '../../common/render-global-var';
    import RenderTaskStep from '../../common/render-task-step';
    import {
        mergeList,
        diffVariableSimple,
        diffStepSimple,
    } from '../components/utils';
    
    export default {
        name: 'SyncPlanStep1',
        components: {
            DetailLayout,
            DetailItem,
            Layout,
            RenderGlobalVar,
            RenderTaskStep,
        },
        props: {
            templateInfo: {
                type: Object,
                default: () => ({
                    variables: [],
                    stepList: [],
                }),
            },
            planInfo: {
                type: Object,
                default: () => ({
                    variableList: [],
                    stepList: [],
                }),
            },
        },
        data () {
            return {
                templateVariableList: [],
                templateStepList: [],
                variableDiff: {},
                stepDiff: {},
            };
        },
        created () {
            this.templateVariableList = Object.freeze(mergeList(this.templateInfo.variables, this.planInfo.variableList));
            this.variableDiff = Object.freeze(diffVariableSimple(this.templateInfo.variables, this.planInfo.variableList));
           
            const [
                templateStepList,
                stepDiff,
            ] = diffStepSimple(this.templateInfo.stepList, this.planInfo.stepList);
            this.templateStepList = Object.freeze(templateStepList);
            this.stepDiff = Object.freeze(stepDiff);
        },
        methods: {
            /**
             * @desc 切换下一步
             */
            handleNext () {
                this.$emit('on-change', 2);
            },
            /**
             * @desc 取消同步
             */
            handleCancel () {
                this.$emit('on-cancel');
            },
        },
    };
</script>
<style lang="postcss">
    .sync-plan-step1 {
        .detail-label {
            padding-right: 24px;
        }
    }
</style>
<style lang='postcss' scoped>
    .sync-plan-step1 {
        padding: 24px 24px 60px;
    }
</style>
